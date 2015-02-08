define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) { 

    CourseModel = Backbone.Model.extend({

    	getCourseName : function () {
    		return this.get('kursnamn');
    	},

    	getStudyPeriods : function () {
    		return this.get('lasperioder');
    	},

    	hasStudyPeriod : function (thisPeriod) {
    		var studyPeriods = this.getStudyPeriods();
    		var exist = _.find(studyPeriods, function (thatPeriod) {// should have '==='
    			return thisPeriod == thatPeriod;
    		})
    		return exist;
    	},

    	getSpecialization : function (special) {
    		return this.get('inriktningar');
    	},

    	inSpecialization : function (thisSpecial) {
    		var specializations = this.getSpecialization();
    		var exist = _.find(specializations, function (thatSpecial) { // should have '==='
    			return thisSpecial == thatSpecial.id;
    		});
    		return exist;
    	}
    	
    });

    return CourseModel;
});

