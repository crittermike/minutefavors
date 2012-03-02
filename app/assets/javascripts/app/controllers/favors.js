App.favorsController = Ember.ResourceController.create({
  resourceType: App.Favor,

  sortNewest: function() {
    this.resourceUrl = window.location.pathname + '?sort=newest';
    this.findAll();
  },
  sortOldest: function() {
    this.resourceUrl = window.location.pathname + '?sort=oldest';
    this.findAll();
  },
  sortPoints: function() {
    this.resourceUrl = window.location.pathname + '?sort=points';
    this.findAll();
  }
});
