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
        this.globalTimeTable = args.globalTimeTable;
    },

    courseAdded : function() {
    	this.render();
    },

    render : function() {
      this.$el.empty();      
      var container = document.createDocumentFragment();
      var self = this;
      this.collection.each (function (course) {
        var view = new TimeTableItemView({
          model : course,
          collection : self.collection,
          globalTimeTable : self.globalTimeTable
        });
        container.appendChild(view.render().el);
      });
      this.$el.append(container);

      return this;
    },

  });

  return TimeTableView;

});