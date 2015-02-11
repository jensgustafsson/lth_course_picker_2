define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone, TimeTableModel) { 

    TimeTableItemView = Backbone.View.extend({
        
        tagName : 'li',
		className : 'list-group-item',

		render : function () {
			this.$el.append(this.model.getCourseName()); 

			//var view = new TimeTableRemoveView({
			//	collection : this.collection,
			//	model : this.model
			//});
			//this.$el.append(view.render().el);
            return this;
		},

    });

    return TimeTableItemView;

});