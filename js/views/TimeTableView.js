define([
  'jquery',
  'underscore',
  'backbone',
  'views/TimeTableItemView',
  'text!../templates/TimeTableTemplate.html'
], function ( $, _, Backbone, TimeTableItemView ,Template) { 

  TimeTableView = Backbone.View.extend({

    initialize : function (args) {
        this.periodName = args.periodName;
        this.listOfCoursesID = args.listOfCoursesID;
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
        this.$el.html(this.template({
                'periodName'   : this.periodName,
                'nbrHP'    : credits,
                'listOfCoursesID' : this.listOfCoursesID
            }));
      //this.$el.append(container);
      //this.$el.append(credits);
        $("#" + this.listOfCoursesID ).append(container);
      return this;
    },

  });

  return TimeTableView;

});