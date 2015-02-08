define([
  'jquery',
  'underscore',
  'backbone',
  'models/CourseModel'
], function ( $, _, Backbone, CourseModel ) { 
    
    TimeTableCourseModel = CourseModel.extend({

        initialize : function () {
        }
    });

    return TimeTableCourseModel;
});
