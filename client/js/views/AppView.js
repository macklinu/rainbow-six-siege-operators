'use strict'

define([
  'underscore',
  'backbone',
  'hogan',
  'text!templates/operator-list-view.html',
], function(_, Backbone, Hogan, listViewTemplate) {
  var Operator = Backbone.Model.extend({
    parse: function(response) {
      return _.assign(response, {
        badgeUrl:
          response.badgeUrl ||
          'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/black-question-mark-ornament_2753.png',
      })
    },
  })

  var Operators = Backbone.Collection.extend({
    model: Operator,
    url: 'http://localhost:3000/operators',
  })

  var BadgeListView = Backbone.View.extend({
    el: '#badges',
    template: Hogan.compile(listViewTemplate),
    events: {
      'click li': 'onItemClick',
    },
    render: function() {
      this.$el.html(
        this.template.render({
          collection: this.collection.map(function(model) {
            return model.pick(['id', 'name', 'badgeUrl'])
          }, this),
        })
      )
      return this
    },
    onItemClick: function(event) {
      var id = this.$(event.currentTarget).data('id')
      var model = this.collection.get(id)
      this.trigger('badge:click', model)
    },
  })

  var OperatorView = Backbone.View.extend({
    el: '#operator',
    initialize: function() {
      this.model.on('change', this.render, this)
    },
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
    handleBadgeClick: function(data) {
      this.model.set(data.toJSON())
    },
  })

  return Backbone.View.extend({
    el: '#app',
    initialize: function() {
      this.collection = new Operators()
      this.collection.on('reset', this.render, this)
      this.collection.fetch({ reset: true })
    },
    render: function() {
      var badgeListView = new BadgeListView({
        collection: this.collection,
      })
      var operatorView = new OperatorView({
        model: new Operator(),
      })
      operatorView.listenTo(
        badgeListView,
        'badge:click',
        operatorView.handleBadgeClick
      )
      this.$el.html([badgeListView.render().el, operatorView.render().el])
      badgeListView.delegateEvents()
      return this
    },
  })
})
