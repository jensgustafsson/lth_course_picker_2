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
            
            var inr = this.get('inriktningar')[0].id;
    		var studyPeriods = this.getStudyPeriods();

            if((inr == 'exjobb' || studyPeriods.length === 0) && thisPeriod == 5)
                return true;

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

