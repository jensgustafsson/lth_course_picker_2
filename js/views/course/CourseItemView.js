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
			var plusIcon = '<span class="glyphicon glyphicon-plus-sign pull-right"></span>';
			var infoIcon = '<span style="margin-right: 5px" class="glyphicon glyphicon-info-sign pull-right"></span>';
			this.$el.append(this.model.getCourseName() + plusIcon + infoIcon);
            return this;
		},

 	});

    return CourseItemView;

});