App.favorsController = Ember.ResourceController.create({
  resourceType: App.Favor,
  single: function() {
    return App.favorsController.get('firstObject');
  }.property()
});
