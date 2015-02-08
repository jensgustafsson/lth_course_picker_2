define([
  'jquery',
  'underscore',
  'backbone',
], function ( $, _, Backbone ) { 

	CourseItemView = Backbone.View.extend({

		tagName : 'li',
		className : 'list-group-item',

		events : {
			//'click' : 'onclick',
		},

		initialize : function (args) {
		},

		render : function () {
			this.$el.append(this.model.getCourseName());
            return this;
		},

 	});

    return CourseItemView;

});