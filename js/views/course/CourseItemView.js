define([
  'jquery',
  'underscore',
  'backbone',
  'views/course/CourseAddView'
], function ( $, _, Backbone, CourseAddView ) { 

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
			this.$el.append(this.model.getCourseName()); // + plusIcon + infoIcon

			var view = new CourseAddView({
				collection : this.collection,
				model : this.model
			});
			this.$el.append(view.render().el);
            return this;
		},

 	});

    return CourseItemView;

});