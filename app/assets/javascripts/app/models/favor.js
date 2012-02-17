App.Favor = Ember.Resource.extend({
  resourceUrl: '/favors',
  resourceName: 'favor',
  resourceProperties: ['title', 'description'],
  
  validate: function() {
    if (this.get('title') === undefined || this.get('title') === '') {
      return 'Favors require a title.';
    }
  }, 

  url: function() {
    return "/favors/" + this.get('id');
  }.property('id'),
  timeago: function() {
    return humaneDate(this.get('created_at'));
  }.property('created_at')
});
