define([
  'jquery',
  'underscore',
  'backbone',
  'views/TimeTableRemoveView'
], function ( $, _, Backbone, TimeTableRemoveView) { 

    TimeTableItemView = Backbone.View.extend({
        
        tagName : 'li',
		className : 'list-group-item',
        
        initialize: function(args) {
            this.globalTimeTable = args.globalTimeTable;
        },
		render : function () {
			this.$el.append(this.model.getCourseName()); 
            var self = this;
			var view = new TimeTableRemoveView({
				collection : this.collection,
				model : this.model,
                globalTimeTable : self.globalTimeTable,

			});
			this.$el.append(view.render().el);
            return this;
		},

    });

    return TimeTableItemView;

});