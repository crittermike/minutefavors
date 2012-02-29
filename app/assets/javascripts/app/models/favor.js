App.Favor = Ember.Resource.extend({
  resourceName: 'favor',
  resourceUrl: '/favors',
  resourceProperties: ['id', 'title', 'description', 'created_at', 'updated_at', 'points', 'user_id', 'status', 'helper_id', 'accepted_at', 'resolution', 'earned'],
  
  // The URL of the individual favor.
  url: function() {
    return "/favors/" + this.get('id');
  }.property('id'),

  // The human-readable time lapsed since creation.
  timeago: function() {
    return humaneDate(this.get('created_at'));
  }.property('created_at'),

  // The number of seconds that have passed since this favor was marked as taken.
  timespent: function() {
    date = new Date(this.get('accepted_at')); // @TODO: Make this work in browser that don't support ISO dates yet.
    return Math.ceil((App.get('current_time') - date.getTime()) / 1000);
  }.property('App.current_time'),

  // The number of points remaining on this favor for the current assignee.
  pointsleft: function() {
    var points = this.get('points') - (this.get('timespent') / 60);
    if (points < 0) {
      points = 0;
    }
    return points.toFixed(1);
  }.property('timespent', 'points'),

  // The style attribute attribute
  progressWidth: function() {
    return "width: " + Math.ceil(100 * (1 - (this.get('pointsleft') / this.get('points')))) + '%;';
  }.property('pointsleft'),

  // Status functions, return info about the current status.
  isOpen: function() {
    return this.get('status') == 'open';
  }.property('status'),
  isTakenByOther: function() {
    return this.get('status') == 'taken' && this.get('helper_id') != App.get('user_id'); 
  }.property('status'),
  isTakenByCurrent: function() {
    return this.get('status') == 'taken' && this.get('helper_id') == App.get('user_id');
  }.property('status'),
  isPending: function() {
    return this.get('status') == 'pending'; 
  }.property('status'),
  isClosed: function() {
    return this.get('status') == 'closed'; 
  }.property('status'),
  isOwner: function() {
    return this.get('user_id') == App.get('user_id');
  }.property()
});
