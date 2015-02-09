define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) { 

	FilterStudyYearItemView = Backbone.View.extend({

		tagName : 'li role="presentation"',
		className : 'studyYearItem',

		events : {
			'click' : 'onClick',
		},

		initialize : function (args) {
			this.studyYear = args.studyYear;
		},

		onClick : function () {
			this.collection.setActiveYear(this.studyYear);
			this.$el.toggleClass('active');
		},

		render : function () {
			this.$el.empty();
			this.$el.toggleClass('active', false);
			this.$el.append("<a>" + this.studyYear + "<\/a>");
            return this;
		}

	});

    return FilterStudyYearItemView;

});