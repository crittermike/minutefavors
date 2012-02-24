App.favorsController = Ember.ResourceController.create({
  resourceType: App.Favor,
  single: function() {
    return App.favorsController.get('firstObject');
  }.property(),
  sortNewest: function() {
    this.resourceUrl = '/favors?sort=newest';
    this.findAll();
  },
  sortOldest: function() {
    this.resourceUrl = '/favors?sort=oldest';
    this.findAll();
  },
  sortPoints: function() {
    this.resourceUrl = '/favors?sort=points';
    this.findAll();
  }
});
