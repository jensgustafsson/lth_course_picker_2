define([
  'jquery',
  'underscore',
  'backbone', 
  'collections/CourseCollection',
  'views/CourseListView',
  'views/filter/FilterSpecializationView',
  'views/filter/FilterStudyYearView',
  'views/filter/FilterStudyPeriodView',
  'views/SpecializationTitleView'
], function ( $, _, Backbone, CourseCollection, CourseListView, FilterSpecializationView, FilterStudyYearView, FilterStudyPeriodView, SpecializationTitleView ) {


    ApplicationRouter = Backbone.Router.extend({

      initialize : function() {

        var courseCollection = new CourseCollection();
        courseCollection.fetch({ reset: true });
        this.initViews(courseCollection);

      },

      initViews : function (courseCollection) {

        new CourseListView ({
          collection : courseCollection
        });

        new FilterSpecializationView ({
          collection : courseCollection
        });

        new FilterStudyPeriodView ({
          collection : courseCollection
        });

        new FilterStudyYearView ({
          collection : courseCollection
        });

        new SpecializationTitleView();

      }

    });

    return ApplicationRouter;

});