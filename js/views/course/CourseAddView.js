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
            alert("add");
        }
        
        ,

		initialize : function (args) {
		},

		render : function () {
            return this;
		},

 	});

    return CourseAddView;

});