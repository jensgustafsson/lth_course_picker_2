define([
  'jquery',
  'underscore',
  'models/TimeTableCourseModel',
  'collections/CourseCollection',
  'backbone',
  'backbone.localStorage'
], function ( $, _, TimeTableCourseModel, CourseCollection, Backbone  ) { 

	TimeTableCollection = CourseCollection.extend({

		initialize : function (args,opt) {
			this.studyYear = opt.studyYear;
			this.listenTo(Backbone, 'add:timeTable', this.addCourse);
		},

		addCourse : function (args) {
			if (this.studyYear === args.studyYear) {
				this.add(args.course);
			}
		},

	});

	return TimeTableCollection;

});