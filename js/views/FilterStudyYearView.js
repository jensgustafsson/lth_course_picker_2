define([
  'jquery',
  'underscore',
  'backbone',
  'views/FilterStudyYearItemView'
], function ( $, _, Backbone, FilterStudyYearItemView) { 

    FilterStudyYearView = Backbone.View.extend({

    	el : '#StudyYearFilter',
    	className : 'nav nav-pills',

    	initialize : function(args) {

    		this.listenTo(Backbone, 'renderStudyYears', this.render);
    		this._views = [];

    		var self = this;
    		var studyYears = ['Läsår 4', 'Läsår 5', 'Extraår 1', 'Extraår 2'];
    		
    		_.each(studyYears, function (year) {
    			self._views.push(new FilterStudyYearItemView({
    				collection : self.collection,
    				studyYear  : year
    			}));
    		});
    		this.render();
    		
    	},

    	render : function () {
    		
    		var container = document.createDocumentFragment();
    		_.each(this._views, function (yearView) {
    			container.appendChild(yearView.render().el);
    		});

    		this.$el.empty();
    		this.$el.append(container);

    		return this;
    	}

    });

    return FilterStudyYearView;

});