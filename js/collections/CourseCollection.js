define([
  'jquery',
  'underscore',
  'backbone',
  'models/CourseModel',
], function ( $, _, Backbone, CourseModel ) { 

    CourseCollection = Backbone.Collection.extend ({
        
        url: "server/server.php",
        model: CourseModel,
    
        filterData : {
            specialization  : 'none',
            activeYear      : 'none', 
            studyPeriods    : [true, true, true, true, true]
        },

        setActiveYear : function (activeYear) {

            this.filterData.activeYear = activeYear;
            Backbone.trigger('renderStudyYears');

        },

        toggleStudyPeriod : function (period) {
            var studyPeriods = this.filterData.studyPeriods;
            switch(period) {
                case 'LP 1':
                    studyPeriods[0] = !studyPeriods[0];
                    break;
                case 'LP 2':
                    studyPeriods[1] = !studyPeriods[1];
                    break;
                case 'LP 3':
                    studyPeriods[2] = !studyPeriods[2];
                    break;
                case 'LP 4':
                    studyPeriods[3] = !studyPeriods[3];
                    break;
                case 'LP saknas':
                    studyPeriods[4] = !studyPeriods[4];
                    break;
            }
            this.filterData.studyPeriods = studyPeriods;
            this.trigger('change');
        },

        chooseSpecialization : function (special) {
            this.filterData.specialization = special.id;
            this.trigger('change');
            Backbone.trigger('changeSpecialization', {title: special.fullName});
        },

        applyFilter: function(){
    		var filteredCollection = 
        		this.applyStudyPeriodFilter();

        	filteredCollection = 
        		filteredCollection.applySpecializationFilter();

        	return filteredCollection;
    	},

    	applyStudyPeriodFilter: function(){

            var self = this;
            var studyPeriods = this.filterData.studyPeriods;
            var results = [];

            for(var i = 0; i < studyPeriods.length; i++) {
                if(studyPeriods[i]) {
                    var subResults = self.filter (function (course) {
                        return course.hasStudyPeriod(i+1);
                    });
                    results = results.concat(subResults);
                }
            }
    		return new CourseCollection(results);
    	},

    	applySpecializationFilter: function(){
            var special = this.filterData.specialization;
    		var results = this.filter (function (course) {
    			return course.inSpecialization(special);
    		});
    		return new CourseCollection(results);
    	},

        getSpecializations : function () {
            var specializations = [];
            var specializationsArray = this.pluck('inriktningar');
            _.each(specializationsArray, function (array) {
                _.each(array, function (special) {
                    specializations.push(special);
                });
            });
            return _.uniq(specializations, _.iteratee('id'));
        }


    });

    return CourseCollection;
});