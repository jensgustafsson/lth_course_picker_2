define([
  'jquery',
  'underscore',
  'backbone',
  'views/SummaryItemView'
], function ( $, _, Backbone, SummaryItemView ) { 

    DetailView = Backbone.View.extend({
		
		el: '#courseSummary',
    	
    	initialize : function () {
    		this.listenTo(this.collection, 'add', this.render);
    		this.listenTo(this.collection, 'remove', this.render);
    	},
	    
	    render : function() {
	    	this.$el.empty();
			
			var container = document.createDocumentFragment();
			this.collection.each (function (course) {
			  var view = new SummaryItemView({
			    model : course
			  });
			  container.appendChild(view.render().el);
			});
			this.$el.append(container);

			return this;
	    }


    });


    return DetailView;

});