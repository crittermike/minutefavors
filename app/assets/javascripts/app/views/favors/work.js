App.FavorWorkView = Em.View.extend({
  templateName: "app/templates/favors/work",
  startWork: function() {
    this.get('favor').startWork();
  },
  cancelWork: function() {
    this.get('favor').cancelWork();
  },
  submitWork: function() {
    this.get('favor').submitWork();
  }
});

