App.ListFavorsView = Ember.View.extend({
  templateName: 'app/templates/favors/list',
  favorsBinding: 'App.favorsController',

  refreshListing: function() {
    App.favorsController.findAll();
  }
});
