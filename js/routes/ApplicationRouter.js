define([
  'jquery',
  'underscore',
  'backbone', 
  'collections/CourseCollection',
  'views/CourseListView',
  'views/FilterSpecializationView',
  'views/FilterStudyYearView',
  'views/FilterStudyPeriodView'
], function ( $, _, Backbone, CourseCollection, CourseListView, FilterSpecializationView, FilterStudyYearView, FilterStudyPeriodView ) {


    ApplicationRouter = Backbone.Router.extend({

      initialize : function() {
        
        var courseCollection = new CourseCollection();
        courseCollection.fetch({ reset: true });
        this.initCourseCollectionViews(courseCollection);

      },

      initCourseCollectionViews : function (courseCollection) {

        new CourseListView ({
          collection : courseCollection
        });

        new FilterSpecializationView ({
          collection : courseCollection
        });

        new FilterStudyPeriodView ({
          collection : courseCollection
        });

      },

      initTimeTableViews : function (collections) {

        new FilterStudyYearView ({
          
        });
      }

    });

    return ApplicationRouter;

});