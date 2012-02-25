App = Ember.Application.create({
  ready: function() {
    App.set('current_time', new Date().getTime()); // Current timestamp.
    var intid = setInterval('App.set("current_time", App.get("current_time") + 1000); App.propertyDidChange("current_time")', 1000);
    //$('#countdown').createTimer({time_in_seconds: $(this).text()});
  }
});
