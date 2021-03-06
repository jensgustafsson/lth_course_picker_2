<?php
include('simple_html_dom.php');
include('Kurs.php');

/*
Kursdata parsas från www.kurser.lth.se med hjälp av simple_html_dom-parser.
**
Ber om ursäkt för att jag konstant blandat svenska och engelska men med tanke på alla 
specifika kolumnnamn var det lättare att bara använda svenska kom jag på halvvägs in i projektet
**

_ __ PARSNING __ _
Parsningen är uppdelad i 2 typer på grund av syntaxen på webbsidan. 
Typ 1: 
 * Först parsas grundblocket
 * Sen specialiseringarna 
 * Till sist de valfria
Typ 2:
 * Parsar hemsidor 
 * ...Läsperioder
 * ...Eventuell fotnot
 * ...Om kursen är periodiserad eller inte

Parsad data används för att skapa ett Kursobjekt.
Kursobjektet läggs till i listan $courses  
*/

/* Välj program */
//$program = $argv[1];

/* Välj vilket läsår som datan ska hämtas från */
//$from_year = $argv[2];
//$to_year = $argv[3];

//$courses = parse($program, $from_year, $to_year);
//return  json_encode($courses, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
//return arrayToJson($courses);


/* Funktioner */

function hitta_inriktning_id($table) {
	$inriktning_id = $table;
	while($inriktning_id->tag != 'a')
		$inriktning_id = $inriktning_id->prev_sibling();
	return $inriktning_id->name;
}

function hitta_inriktning($table) {
	$inriktning_id = $table;
	while($inriktning_id->tag != 'h3')
		$inriktning_id = $inriktning_id->prev_sibling();
	return $inriktning_id->plaintext;
}

function hitta_typ($table) {
	// Hitta typ i grundblock. 
	// Antingen (A)lternativobligatoisk eller (O)bligatorisk
	$typ = $table;
	while($typ->tag != 'h3')
		$typ = $typ->prev_sibling();
	if (strpos($typ->plaintext, 'alternativobligatoriska') !== false)
		return 'A';
	else
		return 'O';

}

function merge_duplicates ($courses) {

	$uniqList = array();
	
	while (count($courses) != 0) {

		$thisCourse = array_shift($courses);

		$alreadyProcessed = false;
		foreach ($uniqList as $foundCourse) {
			if ($thisCourse->kurskod == $foundCourse->kurskod) {
				$alreadyProcessed = true;
			}
		}

		if (!$alreadyProcessed) {

			foreach ($courses as $otherCourse) {
				if ($thisCourse->kurskod == $otherCourse->kurskod) {
					$thisCourse = merge_courses($thisCourse, $otherCourse);
				}
			}
			
			array_push($uniqList, $thisCourse);
		}
		
	}
	return $uniqList;
}

// Merges courses with different specialization but same course code
function merge_courses ($thisCourse, $thatCourse) {
	
	for($i = 0; $i < count($thatCourse->inriktningar); $i++) {
		$inr_obj = $thatCourse->inriktningar[$i];
		array_push($thisCourse->inriktningar, $inr_obj);	
	}

	return $thisCourse;
}

function arrayToJson ($courses) {
	return json_encode(array_values($courses), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function parse($program, $from_year, $to_year) {

	/* Bygg hemsidans adress och skapa ett DOM-träd */
	$url = 'http://kurser.lth.se/lot/?lasar=' . $from_year . '_' . $to_year . '&prog=' . $program . '&val=program';
	// . '&lang=en_US';
	$html = file_get_html($url);

	/* Kurserna som parsas sparas i en lista */
	$courses = array();

	foreach($html->find('table[class]') as $table) {
		
		$inriktning_id = hitta_inriktning_id($table);
		$inriktning = hitta_inriktning($table);
		
		$index = 0;
		$child_of_table = $table->children();
		
		foreach($child_of_table as $tr) {

			$course_data = array();
			$periodiserad = false;
			$lasperioder = array();
			$fotnot = "";
			$course_webpages = array();

			if($index > 0) {

				$inner_index = 0;
				foreach($tr->find('td') as $td) {
					if($inner_index < 9) { 
						// Parsa varje kolumn för sig och lägg till i lista (9 intressanta kolumner)
						array_push($course_data, $td->plaintext);
					}
					$inner_index += 1;
					
					// Parsa länkar till kursplaner, kurshemsida, ceq etc.
					if($td->class == 'pdf-avoidlinebreak')
					{
						$webpages = $td->children();
						foreach($webpages as $webpage) {
							$course_webpages[$webpage->plaintext] = $webpage->href;
						}
					}

					// Parsa läsperiod och info om den
					if($td->class == 'bg_blue')
					{
						$curr_lp = intval(substr($td->plaintext, 0, 1));
						$lasperioder[$curr_lp] = substr($td->plaintext, 1);
					}
					
					// Parsa fotnot
					if($td->class == 'bg_green')
					{
						$fotnot = substr($td->plaintext, 1);
					}

					// Kolla om kurs är periodiserad
					if($td->class == 'bg_pink')
					{
						$periodiserad = true;
					}

				}
				array_push($course_data, $inriktning_id);

				if($inriktning_id == 'ak1' || $inriktning_id == 'ak2' || $inriktning_id == 'ak3') {
					// Data parsad från grundblock
					
					// Spara vilket program
					array_push($course_data, $program);

					// Spara vilken typ
					array_push($course_data, hitta_typ($table));

					// Spara vilken årskurs
					array_push($course_data, intval(substr($inriktning_id, 2)));


					$course = new Kurs($course_data, $lasperioder, $course_webpages, $fotnot, $periodiserad, "grundblock");
					$courses[$course_data[0]] = $course;
				}
				else if($inriktning_id == "valfri"){
					
					// Data parsad från valfria kurser
					array_push($course_data, "V");//lägg till info om valfri kurs
					$course = new Kurs($course_data, $lasperioder, $course_webpages, $fotnot, $periodiserad, "valfri");
					array_push($courses, $course);
					
				}
				else if($inriktning_id == "exjobb") {
					$course = new Kurs($course_data, $lasperioder, $course_webpages, $fotnot, $periodiserad, "exjobb");
					array_push($courses, $course);
				}
				else {
					
					// Data parsad från specialiseringsblocken
					array_push($course_data, $program);
					array_push($course_data, $inriktning_id);
					array_push($course_data, $inriktning);
					
					$course = new Kurs($course_data, $lasperioder, $course_webpages, $fotnot, $periodiserad, "specialisering"); 
					array_push($courses, $course);
					
				}
			
			}
			$index += 1;
		}
	}

	return $courses;
}

?>

