'use strict'

// Define the list of dependencies to require.
// They are available in the second parameter callback function.
define([
  'underscore',
  'backbone',
  'hogan',
  'text!templates/operator-list-view.html',
], function(_, Backbone, Hogan, listViewTemplate) {
  // Define Operator model.
  var Operator = Backbone.Model.extend({
    // Parse JSON response and modify any missing data, if necessary.
    parse: function(response) {
      return _.assign(response, {
        badgeUrl:
          response.badgeUrl ||
          'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/black-question-mark-ornament_2753.png',
      })
    },
  })

  // Define Operator collection.
  var Operators = Backbone.Collection.extend({
    // Use the Operator model as the backing model.
    model: Operator,
    // Set URL for fetching operators from server.
    // Would be nice to switch between dev and prod server URLs here.
    url: 'http://localhost:3000/operators',
  })

  // Define the BadgeListView.
  var BadgeListView = Backbone.View.extend({
    // Bind to the #badges element.
    el: '#badges',
    // Cache the Hogan template for use in the render function.
    template: Hogan.compile(listViewTemplate),
    // Add event listeners.
    // When a list item is clicked, call the onItemClick function.
    events: {
      'click li': 'onItemClick',
    },
    // This is called when the view is constructed.
    initialize: function() {
      // Set up local view state.
      this.state = new Backbone.Model({
        selected: null,
      })
      // When the view state model changes, render the view.
      this.state.on('change', this.render, this)
    },
    // The view render function.
    render: function() {
      this.$el.html(
        this.template.render({
          // Pass a subset of the data into the template.
          // Include the necessary model properties as well as local view state.
          collection: this.collection.map(function(model) {
            return _.assign(model.pick(['id', 'name', 'badgeUrl']), {
              classes:
                this.state.get('selected') === model.get('id')
                  ? 'badge-selected'
                  : '',
            })
          }, this),
        })
      )
      return this
    },
    // Called when a child <li> element is clicked.
    onItemClick: function(event) {
      // Find the id and model from the clicked item's data-id attribute.
      var id = this.$(event.currentTarget).data('id')
      var model = this.collection.get(id)
      // Trigger a badge:click event for other views to listen to.
      this.trigger('badge:click', model)
      // Update local view state with the selected operator id.
      this.state.set('selected', id)
    },
  })

  // Define the OperatorView.
  var OperatorView = Backbone.View.extend({
    // Bind to the #operator element.
    el: '#operator',
    // Called when the view is constructed.
    initialize: function() {
      // When the supplied Operator model changes, render the view.
      this.model.on('change', this.render, this)
    },
    // The view render function.
    render: function() {
      if (this.model.isEmpty()) {
        // TODO update no operator view
        this.$el.html('Select an operator')
      } else {
        // TODO update operator view
        this.$el.html(this.model.get('name'))
      }
      return this
    },
    // A listener function called when a badge is clicked.
    // The listener is set up in the AppView.
    // This will receive a new Operator model, when called.
    handleBadgeClick: function(newModel) {
      // Set the new Operator model as this.model, triggering a view render.
      this.model.set(newModel.toJSON())
    },
  })

  // Define the AppView.
  return Backbone.View.extend({
    // Bind to the #app element.
    el: '#app',
    // Called when the view is constructed.
    initialize: function() {
      // Create an Operators collection.
      this.collection = new Operators()
      // When the collection is reset, render the view with the new data.
      this.collection.on('reset', this.render, this)
      // Execute a network request to fetch data from the server.
      // When successful, triggers the reset event, which will render the view with new data.
      this.collection.fetch({ reset: true })
    },
    // The view render function.
    render: function() {
      // Create views.
      var badgeListView = new BadgeListView({
        // Pass collection into list view.
        // Let the AppView handle data fetching.
        collection: this.collection,
      })
      var operatorView = new OperatorView({
        // Default to an empty Operator model.
        model: new Operator(),
      })
      // Receive a notification when a badge is clicked
      // in order to display updated operator information.
      operatorView.listenTo(
        badgeListView,
        'badge:click',
        operatorView.handleBadgeClick
      )
      // Render the views in order.
      this.$el.html([badgeListView.render().el, operatorView.render().el])
      // This is required since badges are added dynamically to the DOM
      // after being fetched from the server.
      // Not sure if this is the proper way to do this.
      badgeListView.delegateEvents()
      return this
    },
  })
})
