App.FavorModerateView = Em.View.extend({
  templateName: "app/templates/favors/moderate",
  classNames: ["btn-group"],
  approveWork: function() {
    this.get('favor').approveWork();
  },
  rejectWork: function() {
    this.get('favor').rejectWork();
  }
});

