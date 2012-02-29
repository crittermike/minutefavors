App.TagView = Em.View.extend({
  templateName: "app/templates/favors/tag",
  tagName: "li",
  url: function() {
    var tag = this.get('tag');
    return '/favors/tag/' + tag.name;
  }.property()
});
