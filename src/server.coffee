http = require 'http'
cc = require 'coffeecup'
js2coffee = require 'js2coffee'
page = require './page'
sio = require 'socket.io'
filed = require 'filed'

server = http.createServer (req, res) ->
  if req.url == '/'
    res.writeHead 200, 'content-type': 'text/html'
    res.end cc.render(page, js: '', coffee: '')
  else
    filed('./public' + req.url).pipe(res)

io = sio.listen(server)
io.sockets.on 'connection', (socket) ->
  socket.on 'convert', (js) ->
    cs = "could not convert"
    try 
      cs = js2coffee.build(js)
    catch err
      cs = err.message
    finally
      socket.emit 'result', cs

server.listen 3000
