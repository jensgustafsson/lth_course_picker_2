define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) { 

    FilterModel = Backbone.Model.extend({

    	defaults: {
    		specialization : 'none',
    		studyPeriods : [true, true, true, true, true]
  		},

    	initialize : function () {
    		this.listenTo(Backbone, 'filter:toggleAllSP', this.toggleAllStudyPeriods);
    		this.listenTo(Backbone, 'filter:toggleSP', this.toggleStudyPeriod);
    		this.listenTo(Backbone, 'filter:chooseSpec', this.chooseSpecialization);
    	},

    	toggleStudyPeriod : function (period) {
            console.log('toggle SP');
            
            var periodIndex = period - 1;
            var newStudyPeriods = this.get('studyPeriods');
            studyPeriods[periodIndex] = !studyPeriods[periodIndex]
            this.set('studyPeriods', newStudyPeriods);
    	},

    	toggleAllStudyPeriods : function () {
    		console.log('toggle all SP:s');
            this.set('studyPeriods', [true, true, true, true, true]);
    	},

    	chooseSpecialization : function (special) {
            this.set('specialization', special);
    	}

    });

    return FilterModel;
});

