'use strict'

// Set up require.js.
require.config({
  baseUrl: 'js/libs',
  // Paths are relative to the baseUrl property.
  paths: {
    views: '../views',
    templates: '../templates',
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

// The application entry point.
require(['jquery', 'views/AppView'], function($, AppView) {
  // When the DOM has finished loading, create and render the app view.
  $(function() {
    var appView = new AppView()
    appView.render()
  })
})
