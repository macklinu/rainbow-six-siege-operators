'use strict'

require.config({
  baseUrl: 'js/libs',
  paths: {
    views: '../views',
    templates: '../templates',
    models: '../models',
    mustache: 'mustache',
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
    mustache: {
      exports: 'Mustache',
    },
  },
})

require(['jquery'], function($) {
  $(function() {
    console.log('ready!')
  })
})
