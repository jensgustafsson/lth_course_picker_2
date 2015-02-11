define([
  'jquery',
  'underscore',
  'backbone',
], function ( $, _, Backbone ) { 

    SpecSummaryView = Backbone.View.extend({
		
		el: '#specSummary',
    	
    	initialize : function () {
    		this.listenTo(this.collection, 'add', this.render);
    		this.listenTo(this.collection, 'remove', this.render);
    	},
	    
	    render : function() {
	    	this.$el.empty();
	    	
	    	var self = this;
	    	var specializations = this.collection.getSpecializations();
	    	var container = document.createDocumentFragment();

			_.each(specializations, function(special)) {
				var name = special.fullName;
				var credits = self.collection.getSpecialCredits(special.id);
				container.appendChild(name + '\t' + credits + 'hp');
			}
			/*
			
			  
			});
			this.$el.append(container);
			console.log(this.el);*/

			return this;
	    }


    });


    return SpecSummaryView;

});