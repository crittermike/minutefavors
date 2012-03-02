App.favorsController = Ember.ResourceController.create({
  resourceType: App.Favor,

  single: function() {
    return App.favorsController.get('firstObject');
  }.property(),

  sortNewest: function() {
    this.resourceUrl = window.location.pathname + '?sort=newest';
    this.findAll();
  },
  sortOldest: function() {
    this.resourceUrl = window.location.pathname + '?sort=oldest';
    this.findAll();
  },
  sortPoints: function() {
    this.resourceUrl = window.location.pathname + '?sort=points';
    this.findAll();
  },

  startWork: function() {
    var favor = this.get('single');

    if (favor.get('helper_id') == App.get('user_id')) {
      alert("You can't restart a favor you already canceled, you points-hogging sly guy you.")
    } else {
      favor.set('status', 'taken');
      favor.set('helper_id', App.get('user_id'));
      favor.set('accepted_at', ISODateString(new Date()));

      favor.saveResource()
        .fail(function(e) {
          alert("Oops, something went wrong. Reload the page and try again, and if that doesn't work, contact us.");
        })
        .done(function() {
        });
    }

  },

  cancelWork: function() {
    var favor = this.get('single');

    favor.set('status', 'open');

    favor.saveResource()
      .fail(function(e) {
        alert("Oops, something went wrong. Reload the page and try again, and if that doesn't work, contact us.");
      })
      .done(function() {
      });
  },

  submitWork: function() {
    var favor = this.get('single');

    favor.set('status', 'pending');
    favor.set('resolution', $('#favor-resolution').val());
    favor.set('earned', Math.ceil(favor.get('pointsleft')));
    $('#resolution-modal').modal('hide');

    favor.saveResource()
      .fail(function(e) {
        alert("Oops, something went wrong. Reload the page and try again, and if that doesn't work, contact us.");
      })
      .done(function() {
        window.location.reload(false); // Reload the page to fetch the Markdown-ified resolution.
      });
  },

  approveWork: function() {
    var favor = this.get('single');

    favor.set('status', 'closed');
    favor.set('is_accepted', 'true');

    favor.saveResource()
      .fail(function(e) {
        alert("Oops, something went wrong. Reload the page and try again, and if that doesn't work, contact us.");
      })
      .done(function() {
      });
    
  },

  rejectWork: function() {
    var favor = this.get('single');

    favor.set('status', 'open');
    favor.set('helper_id', 0);
    favor.set('resolution', '');
    favor.set('earned', 0);

    favor.saveResource()
      .fail(function(e) {
        alert("Oops, something went wrong. Reload the page and try again, and if that doesn't work, contact us.");
      })
      .done(function() {
      });
  }

});
