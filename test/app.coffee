request = require 'request'
app = require '../server'

describe 'js2cs', ->
  describe 'GET /', ->
    html = ''
    response = null
    before (done) ->
      request 'http://localhost:3000/', (err, res, body) ->
        html = body
        response = res
        done()
    it 'should return statusCode 200', ->
      response.statusCode.should.equal 200
    it 'should return content-type html', ->
      response.headers['content-type'].should.equal 'text/html'
    it 'should return two input boxes', ->
      console.log html
