define([
  'jquery',
  'underscore',
  'backbone',
], function ( $, _, Backbone ) { 

	CourseAddView = Backbone.View.extend({

		tagName : 'span',
		className : 'glyphicon glyphicon-plus-sign pull-right',

		events : {
			'click' : 'onClick',
		},
        
    onClick : function(){
    	var studyYear = this.collection.filterData.activeYear;
      Backbone.trigger('add:timeTable', {
      	'studyYear': studyYear,
      	'course': this.model
      });
    },

		initialize : function (args) {
			this.studyYear = args.studyYear;
      this.globalTimeTable = args.globalTimeTable;
		},

		render : function () {
      return this;
		},

 	});

    return CourseAddView;

});