define([
  'jquery',
  'underscore',
  'backbone',
], function ( $, _, Backbone) { 

	TimeTableRemoveView = Backbone.View.extend({

		tagName : 'span',
		className : 'glyphicon glyphicon-minus-sign pull-right',

		events : {
			'click' : 'onClick',
		},
        
        onClick : function(){
            this.globalTimeTable.remove(this.model);
            this.collection.remove(this.model);
        }
        
        ,

		initialize : function (args) {
			this.studyYear = args.studyYear;
            this.globalTimeTable = args.globalTimeTable;
		},

		render : function () {
            return this;
		},

 	});

    return TimeTableRemoveView;

});