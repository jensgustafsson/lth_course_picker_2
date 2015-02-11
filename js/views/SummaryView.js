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
			
			/*var container = document.createDocumentFragment();
			this.collection.each (function (course) {
			  var view = new SummaryItemView({
			    model : course
			  });
			  container.appendChild(view.render().el);
			});
			this.$el.append(container);
			*/
			var credits = this.collection.getTotalCredits();
			var advanceCredits = this.collection.getTotalAdvanceCredits();
			var optionalCredits = this.collection.getTotalOptionalCredits();

			var startTag = '<li class="list-group-item">';
			var endTag = '</li>';

			var allCreditsText = startTag + "Total poäng: " + credits + ' hp' + endTag;
			var advanceCreditsText = startTag + "Avancerade poäng: " + advanceCredits + ' hp' + endTag;
			var optionalCreditsText = startTag + "Valfria poäng: " + optionalCredits + ' hp' + endTag;
			this.$el.append(allCreditsText);
			this.$el.append(advanceCreditsText);
			this.$el.append(optionalCreditsText);


			return this;
	    }


    });


    return DetailView;

});