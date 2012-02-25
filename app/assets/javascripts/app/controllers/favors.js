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
  },

  startWork: function() {
    var favor = this.get('single');

    favor.set('status', 'taken');
    favor.set('helper_id', App.get('user_id'));
    favor.set('accepted_at', ISODateString(new Date()));

    favor.saveResource()
      .fail(function(e) {
        alert("Oops, something went wrong. Reload the page and try again, and if that doesn't work, contact us.");
      })
      .done(function() {
        $('#countdown').createTimer({time_in_seconds: 60*30})
      });
  }
});
