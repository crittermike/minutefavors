App.Favor = Ember.Resource.extend({
  resourceName: 'favor',
  resourceUrl: '/favors',
  resourceProperties: ['id', 'title', 'description', 'created_at', 'updated_at', 'points', 'user_id', 'status', 'helper_id', 'accepted_at'],
  
  // The URL of the individual favor.
  url: function() {
    return "/favors/" + this.get('id');
  }.property('id'),

  // The human-readable time lapsed since creation.
  timeago: function() {
    return humaneDate(this.get('created_at'));
  }.property('created_at'),

  // Find the number of seconds left before this task expires.
  timeleft: function() {
    date = new Date(this.get('accepted_at')); // @TODO: Make this work in browser that don't support ISO dates yet.
    expires = date.getTime() + (60 * 30 * 1000) // Timestamp of 30 minutes from the acceptance. 
    return secondsToTime(Math.ceil((expires - App.get('current_time')) / 1000));
  }.property('App.current_time'),

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
  isClosed: function() {
    return this.get('status') == 'closed'; 
  }.property('status')
});
