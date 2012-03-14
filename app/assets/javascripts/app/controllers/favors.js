App.favorsController = Ember.ResourceController.create({
  showAll: true,
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
  },

  filterOpen: function() {
    this.set('showAll', false);
  },
  filterAll: function() {
    this.set('showAll', true);
  }
});
