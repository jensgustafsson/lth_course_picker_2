define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) { 

	FilterStudyPeriodItemView = Backbone.View.extend({

		tagName : 'li role="presentation"',
		className : 'studyPeriodItem',

		events : {
			'click' : 'onClick',
		},

		initialize : function (args) {
			this.studyPeriod = args.studyPeriod;
		},

		onClick : function () {
			this.collection.toggleStudyPeriod(this.studyPeriod);
			this.$el.toggleClass('active');
		},

		render : function () {
			this.$el.toggleClass('active');
			this.$el.append("<a>" + this.studyPeriod + "<\/a>");
            return this;
		}

	});

    return FilterStudyPeriodItemView;

});