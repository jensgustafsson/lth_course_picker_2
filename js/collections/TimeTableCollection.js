define([
  'jquery',
  'underscore',
  'models/TimeTableCourseModel',
  'collections/CourseCollection',
  'backbone',
  'backbone.localStorage'
], function ( $, _, TimeTableCourseModel, CourseCollection, Backbone  ) { 

	TimeTableCollection = CourseCollection.extend({



	});

	return TimeTableCollection;

});