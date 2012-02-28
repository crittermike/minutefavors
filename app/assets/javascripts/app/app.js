App = Ember.Application.create({
  ready: function() {
    App.set('current_time', new Date().getTime()); // Current timestamp.

    // Set an interval that updates the current_time and also tells Ember that the property changed.
    var intid = setInterval('App.set("current_time", App.get("current_time") + 1000); App.propertyDidChange("current_time")', 1000);
  }
});
