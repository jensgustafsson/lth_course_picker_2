define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) { 

    FilterModel = Backbone.Model.extend({

        defaults : {
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
            //this.trigger("change");
        },

        chooseSpecialization : function (special) {
            this.filterData.specialization = special;
            //this.trigger("change");
        },

    	initialize : function () {
    		this.listenTo(Backbone, 'filter:toggleAllSP', this.test);
    		this.listenTo(Backbone, 'filter:toggleSP', this.test);
    		this.listenTo(Backbone, 'filter:chooseSpec', this.test);
    	},

        test : function () {
            console.log('hej');
        }

        /*
    	toggleAllStudyPeriods : function () {
    		console.log('toggle all SP:s');
            this.set('studyPeriods', [true, true, true, true, true]);
    	},
        */

    });

    return FilterModel;
});

