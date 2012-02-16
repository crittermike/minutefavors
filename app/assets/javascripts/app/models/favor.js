App.Favor = Ember.Resource.extend({
  resourceUrl: '/favors',
  resourceName: 'favor',
  resourceProperties: ['title', 'description']
  
  validate: function() {
    if (this.get('title') === undefined || this.get('title') === '') {
      return 'Favors require a title.';
    }
  } 
});
