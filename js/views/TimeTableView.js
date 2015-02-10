define([
  'jquery',
  'underscore',
  'backbone',
  'views/course/CourseItemView'
], function ( $, _, Backbone, CourseItemView ) { 

  TimeTableView = Backbone.View.extend({

  	
    className : 'list-group',

    initialize : function (args) {
    	this.el = args.el;
    	this.listenTo(this.collection, 'add', this.courseAdded);
    },

    courseAdded : function() {
    	this.render();
    },

    render : function() {
      this.$el.empty();

      
      var container = document.createDocumentFragment();
      this.collection.each (function (course) {
        var view = new CourseItemView({
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