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
            specialization : 'none',
            studyPeriods : [true, true, true, true, true]
        },

        toggleStudyPeriod : function (period) {
            switch(period) {
                case 'LP 1':
                    this.filterData.studyPeriods[0] = !this.filterData.studyPeriods[0];
                    break;
                case 'LP 2':
                    this.filterData.studyPeriods[1] = !this.filterData.studyPeriods[1];
                    break;
                case 'LP 3':
                    this.filterData.studyPeriods[2] = !this.filterData.studyPeriods[2];
                    break;
                case 'LP 4':
                    this.filterData.studyPeriods[3] = !this.filterData.studyPeriods[3];
                    break;
                case 'LP saknas':
                    this.filterData.studyPeriods[4] = !this.filterData.studyPeriods[4];
                    break;
            }
            console.log(this.filterData.studyPeriods);
            this.trigger("change");
        },

        chooseSpecialization : function (special) {
            this.filterData.specialization = special;
            this.trigger("change");
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
                        return course.hasStudyPeriod(i);
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