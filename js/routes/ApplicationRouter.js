define([
  'jquery',
  'underscore',
  'backbone', 
  'collections/CourseCollection',
  'collections/TimeTableCollection',
  'views/course/CourseListView',
  'views/filter/FilterSpecializationView',
  'views/filter/FilterStudyYearView',
  'views/filter/FilterStudyPeriodView',
  'views/SpecializationTitleView',
  'views/TimeTableView',
  'views/SummaryView',
  'views/SpecSummaryView'
], function ( $, _, Backbone, CourseCollection, TimeTableCollection, CourseListView, FilterSpecializationView, FilterStudyYearView, FilterStudyPeriodView, SpecializationTitleView, TimeTableView, SummaryView, SpecSummaryView ) {

    ApplicationRouter = Backbone.Router.extend({

      initialize : function() {

        var courseCollection = new CourseCollection();
        var globalTimeTable = new TimeTableCollection([], {'studyYear' : 'none'});
        courseCollection.fetch({ reset: true });
        this.initViews(courseCollection, globalTimeTable);

      },

      initViews : function (courseCollection, globalTimeTable) {
        
        new CourseListView ({
          collection : courseCollection,
          globalTimeTable : globalTimeTable
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

        new TimeTableView({
          collection : new TimeTableCollection([],{
            'studyYear' : 'Läsår 4'
          }),
          'el' : '#studyYear4',
          globalTimeTable : globalTimeTable
        });

        new TimeTableView({
          collection : new TimeTableCollection([],{
            'studyYear' : 'Läsår 5',
          }),
          'el' : '#studyYear5',
          globalTimeTable : globalTimeTable
        });

        new TimeTableView({
          collection : new TimeTableCollection([],{
            'studyYear' : 'Extraår 1'
          }),
          'el' : '#studyExtraYear1',
          globalTimeTable : globalTimeTable
        });

        new TimeTableView({
          collection : new TimeTableCollection([],{
            'studyYear' : 'Extraår 2'
          }),
          'el' : '#studyExtraYear2',
          globalTimeTable : globalTimeTable
        });

        new SummaryView({
          collection : globalTimeTable
        });

        new SpecSummaryView({
          collection : globalTimeTable
        });
      }

    });

    return ApplicationRouter;

});