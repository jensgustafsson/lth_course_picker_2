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
	    	
	    	var self = this;
	    	var specializations = this.collection.getSpecializations();

	    	
	    	this.$el.empty();
			_.each(specializations, function(special) {
				var name = special.fullName;
				var credits = self.collection.getSpecialCredits(special);
				var startTag = '<li class="list-group-item">';
				var endTag = '</li>';
				var text = startTag + name + ': ' + credits + ' hp' + endTag;
				self.$el.append(text);
			});


			return this;
	    }


    });


    return SpecSummaryView;

});