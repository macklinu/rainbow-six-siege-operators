# Rainbow Six Siege Operators

## Background

The goal of this web app is to learn some web technologies I'll be working with,
using
[my favorite video game](https://rainbow6.ubisoft.com/siege/en-us/home/index.aspx)
as a data source.

### Client-side Libraries

* [Backbone.js](http://backbonejs.org/)
* [Hogan.js](http://twitter.github.io/hogan.js/)
* [Underscore.js](http://underscorejs.org/)
* [jQuery](http://jquery.com/)
* [Require.js](http://requirejs.org/)
* [serve](https://github.com/zeit/serve)

### Server-side Libraries

* [Micro](https://github.com/zeit/micro)

## Setup

Install the latest stable version of [Yarn](https://yarnpkg.com/en/), and the
preferred Node.js version for development is the latest version of Node 8.x.

## Develop

Install client and server dependencies with `yarn install`.

Run the development server (client and server) with `yarn start`. Visit
[http://localhost:5000/](http://localhost:5000/) once the servers are started to
view the web app in the browser (only tested on Chrome, for now).

## Documentation

`client/js/main.js` is the application entry point, with the Require.js
configuration and initial app rendering code.

`client/js/view/AppView.js` is commented with my understanding of how to require
dependencies and work with the Backbone.js.

`server/index.js` is a simple [Micro](https://github.com/zeit/micro) server that
returns a list of operators as JSON. This is fetched by the client when the
`AppView` is initialized.

## Roadmap

* Add client-side data filtering. For example, view all of the attacking
  operators, or operators that belong to a group (like FBI SWAT)
* Integrate [Less](http://lesscss.org/) and
  [Bootstrap](https://getbootstrap.com/)
