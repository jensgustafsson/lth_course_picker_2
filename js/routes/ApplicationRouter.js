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
  'views/SummaryView'
], function ( $, _, Backbone, CourseCollection, TimeTableCollection, CourseListView, FilterSpecializationView, FilterStudyYearView, FilterStudyPeriodView, SpecializationTitleView, TimeTableView, SummaryView ) {

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
          'el' : '#studyYear4'
        });

        new TimeTableView({
          collection : new TimeTableCollection([],{
            'studyYear' : 'Läsår 5',
          }),
          'el' : '#studyYear5'
        });

        new TimeTableView({
          collection : new TimeTableCollection([],{
            'studyYear' : 'Extraår 1'
          }),
          'el' : '#studyExtraYear1'
        });

        new TimeTableView({
          collection : new TimeTableCollection([],{
            'studyYear' : 'Extraår 2'
          }),
          'el' : '#studyExtraYear2'
        });

        new SummaryView({
          collection : globalTimeTable
        });

      }

    });

    return ApplicationRouter;

});