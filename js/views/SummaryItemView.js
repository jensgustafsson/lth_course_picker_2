define([
  'jquery',
  'underscore',
  'backbone',
], function ( $, _, Backbone ) { 

	SummaryItemView = Backbone.View.extend({

		tagName : 'li',
		className : 'list-group-item',

		initialize : function (args) {
			this.globalTimeTable = args.globalTimeTable;
		},

		render : function () {

			this.$el.append('RANDOM KURSDATA SOM SKA VISAS HÄR'); 
            return this;

		},

 	});

    return SummaryItemView;

});