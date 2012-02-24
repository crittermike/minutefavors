App.favorsController = Ember.ResourceController.create({
  resourceType: App.Favor,
  single: function() {
    return App.favorsController.get('firstObject');
  }.property(),
  sortNewest: function() {
    SC.routes.set('location', 'newest');
    this.resourceUrl = '/favors?sort=newest';
    this.findAll();
  },
  sortOldest: function() {
    SC.routes.set('location', 'oldest');
    this.resourceUrl = '/favors?sort=oldest';
    this.findAll();
  },
  sortPoints: function() {
    SC.routes.set('location', 'points');
    this.resourceUrl = '/favors?sort=points';
    this.findAll();
  }
});
