define([
  'jquery',
  'underscore',
  'backbone',
  'views/course/CourseItemView'
], function ( $, _, Backbone, CourseItemView ) { 

  CourseListView = Backbone.View.extend({

  	el: '#courseCollection',
    className : 'list-group',


    initialize : function(args) {
      this.listenToOnce(this.collection, 'reset', this.coursesLoaded);
      this.listenTo(this.collection, 'change', this.render);
      this.globalTimeTable = args.globalTimeTable;
    },

    coursesLoaded : function () {
      this.render();
    },

    render : function() {
      var self = this;
      this.$el.empty();

      var filteredCollection = 
        this.collection.applyFilter();
      
      var container = document.createDocumentFragment();
      filteredCollection.each (function (course) {
        var view = new CourseItemView({
          collection : self.collection,
          globalTimeTable : self.globalTimeTable,
          model : course
        });
        container.appendChild(view.render().el);
      });
      this.$el.append(container);

      return this;
    },

  });

  return CourseListView;

});