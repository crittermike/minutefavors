App.AdminControlsView = Em.View.extend({
  templateName: "app/templates/favors/admin",
  classNames: ["btn-group"],
  editurl: function() {
    var favor = this.get('favor');
    return '/favors/' + favor.id + '/edit';
  }.property(),
  deleteurl: function() {
    var favor = this.get('favor');
    return '/favors/' + favor.id;
  }.property(),
});
