App.Favor = Ember.Resource.extend({
  resourceName: 'favor',
  
  url: function() {
    return "/favors/" + this.get('id');
  }.property('id'),
  timeago: function() {
    return humaneDate(this.get('created_at'));
  }.property('created_at')
});
