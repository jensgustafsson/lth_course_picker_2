<?php
include('kurs_parser.php');

$path = '../jsonData/';
$file_datateknik = $path . 'datateknik.json';
$file_elektroteknik = $path . 'elektroteknik.json';
$file_tekniskfysik = $path . 'tekniskfysik.json';

$fromYear = 14;
$toYear = 15;

$dataKurser = parse('D', $fromYear, $toYear);
$elektroKurser = parse('E', $fromYear, $toYear);
$fysikKurser = parse('F', $fromYear, $toYear);

$dataKurser = merge_duplicates($dataKurser);
$elektroKurser = merge_duplicates($elektroKurser);
$fysikKurser = merge_duplicates($fysikKurser);

file_put_contents($file_datateknik, arrayToJson($dataKurser));
file_put_contents($file_elektroteknik, arrayToJson($elektroKurser));
file_put_contents($file_tekniskfysik, arrayToJson($fysikKurser));

?>