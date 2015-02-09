define([
  'jquery',
  'underscore',
  'backbone',
  'views/FilterSpecializationItemView'
], function ( $, _, Backbone, FilterSpecializationItemView ) { 


  FilterSpecializationView = Backbone.View.extend({

    el : '#SpecializationFilter',
    className : 'list-inline',

    initialize : function(args) {
      this.listenToOnce(this.collection, 'reset', this.setup);
      this.listenTo(Backbone, 'changeSpecialization', this.render);
    },

    setup : function () {
      
      this._views = [];

      var self = this;
      var specializations = this.collection.getSpecializations();
      
      _.each(specializations, function (special) {
          self._views.push(new FilterSpecializationItemView({
            collection : self.collection,
            special    : special
          }));
      });
      this.render();
      
    },

    render : function () {

      var container = document.createDocumentFragment();
      _.each(this._views, function (specialView) {
          container.appendChild(specialView.render().el);
        });

      this.$el.empty();
      this.$el.append(container);

      return this;
    }

  });

  return FilterSpecializationView;

});