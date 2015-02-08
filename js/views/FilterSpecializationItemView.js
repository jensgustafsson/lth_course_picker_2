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
			this.collection.chooseSpecialization(this.specId);
		},

		initialize : function (args) {
			this.specFullName = args.special.fullName;
			this.specId = args.special.id;
		},

		render : function () {
			this.$el.append(this.specFullName);
            return this;
		}

	});

    return FilterSpecializationItemView;

});