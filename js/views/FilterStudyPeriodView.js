define([
  'jquery',
  'underscore',
  'backbone',
  'views/FilterStudyPeriodItemView'
], function ( $, _, Backbone, FilterStudyPeriodItemView ) { 

    FilterStudyPeriodView = Backbone.View.extend({

    	el : '#StudyPeriodFilter',
    	className : 'nav nav-pills',

    	initialize : function () {
            
            this._views = [];
                        
            var self = this; 
            var studyPeriods = ['LP 1', 'LP 2', 'LP 3', 'LP 4', 'LP saknas'];

            _.each(studyPeriods, function (studyPeriod) {
                self._views.push(new FilterStudyPeriodItemView({
                    collection  : self.collection,
                    studyPeriod : studyPeriod
                }));
            });
            
            this.render();
        },

        render : function () {

            var container = document.createDocumentFragment();
    		_.each(this._views, function (spView) {
    			container.appendChild(spView.render().el);
    		});
            this.$el.append(container);

            return this; 

    	}

    });

    return FilterStudyPeriodView;

});