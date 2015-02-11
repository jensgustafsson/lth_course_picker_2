define([
  'jquery',
  'underscore',
  'backbone',
  'views/TimeTableItemView'
], function ( $, _, Backbone, TimeTableItemView ) { 

  TimeTableView = Backbone.View.extend({

    initialize : function (args) {
    	this.el = args.el;
    	this.listenTo(this.collection, 'add', this.courseAdded);
    },

    courseAdded : function() {
    	this.render();
    },

    render : function() {
        console.log(this.collection);
      this.$el.empty();

      
      var container = document.createDocumentFragment();
      this.collection.each (function (course) {
        var view = new TimeTableItemView({
          model : course
        });
        container.appendChild(view.render().el);
      });
      this.$el.append(container);

      return this;
    },

  });

  return TimeTableView;

});