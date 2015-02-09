define([
  'jquery',
  'underscore',
  'backbone',
  'views/CourseItemView'
], function ( $, _, Backbone, CourseItemView ) { 

  TimeTableView = Backbone.View.extend({

  	el: '#courseCollection',
    className : 'list-group',

    initialize : function () {
    	this.listenTo(this.collection, 'add', this.render);
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