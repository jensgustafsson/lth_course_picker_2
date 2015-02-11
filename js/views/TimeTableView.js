define([
  'jquery',
  'underscore',
  'backbone',
  'views/TimeTableItemView',
  'text!../templates/TimeTableTemplate.html'
], function ( $, _, Backbone, TimeTableItemView ,Template) { 

  TimeTableView = Backbone.View.extend({

    initialize : function (args) {
    	this.el = args.el;
    	this.listenTo(this.collection, 'add', this.courseAdded);
      this.listenTo(this.collection, 'remove', this.render);
      this.globalTimeTable = args.globalTimeTable;
      this.template = _.template(Template);
      this.render();
    },

    courseAdded : function() {
    	this.render();
    },

    render : function() {
      var credits = this.collection.reduce(function(sum,item){
        return sum + item.getCredits();
      },0)
      this.$el.empty();      
      var container = "";
      var self = this;
      this.collection.each (function (course) {
        var view = new TimeTableItemView({
          model : course,
          collection : self.collection,
          globalTimeTable : self.globalTimeTable
        });
          container = view.render().el;
        //container.appendChild(view.render().el);
      });
        console.log(String(container.nodeValue));
        this.$el.html(this.template({
                'periodName'   : "test",
                'nbrHP'    : credits,
                'listOfCourses' : container
            }));
      //this.$el.append(container);
      //this.$el.append(credits);

      return this;
    },

  });

  return TimeTableView;

});