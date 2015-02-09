define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) { 

    SpecializationTitleView = Backbone.View.extend({

    	el : '#SpecializationTitle',
    	
    	initialize : function(args) {

    		this.listenTo(Backbone, 'changeSpecialization', this.render);
    	},

    	render : function (args) {	
    		this.$el.empty();
    		this.$el.append('<h3>' + args.title + '</h3>');
    		return this;
    	}

    });

    return SpecializationTitleView;

});