'use strict'

const { parse } = require('url')
const { send, createError } = require('micro')
const cors = require('micro-cors')()
const operators = require('./operators')

const handler = (req, res) => {
  const { pathname } = parse(req.url)
  if (pathname === '/operators') {
    return send(res, 200, Object.values(operators))
  }
  throw createError(404, 'Not Found')
}

module.exports = cors(handler)
