define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) { 

	FilterSpecializationItemView = Backbone.View.extend({

		tagName : 'div',
		className : 'btn btn-default btn-xs',

		events : {
			'click' : 'onClick',
		},

		onClick : function () {
			this.collection.chooseSpecialization(this.spec);
			this.$el.toggleClass('active');
		},

		initialize : function (args) {
			this.spec = args.special;
		},

		render : function () {
			this.$el.empty();
			this.$el.toggleClass('active', false);
			this.$el.append(this.spec.fullName);
            return this;
		}

	});

    return FilterSpecializationItemView;

});