'use strict'

require.config({
  baseUrl: 'js/libs',
  paths: {
    views: '../views',
    templates: '../templates',
    models: '../models',
    collections: '../collections',
  },
  shims: {
    backbone: {
      // These script dependencies should be loaded before loading Backbone.
      deps: ['underscore', 'jquery'],
      // Once loaded, use the global 'Backbone' as the module value.
      exports: 'Backbone',
    },
    underscore: {
      exports: '_',
    },
  },
})

require(['jquery', 'views/AppView'], function($, AppView) {
  $(function() {
    var appView = new AppView()
    appView.render()
  })
})
