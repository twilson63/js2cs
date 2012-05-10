var cc, filed, http, io, js2coffee, page, server, sio;

http = require('http');

cc = require('coffeecup');

js2coffee = require('js2coffee');

page = require('./page');

sio = require('socket.io');

filed = require('filed');

server = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    return res.end(cc.render(page, {
      js: '',
      coffee: ''
    }));
  } else {
    return filed('./public' + req.url).pipe(res);
  }
});

io = sio.listen(server);

io.sockets.on('connection', function(socket) {
  return socket.on('convert', function(js) {
    var cs;
    cs = "could not convert";
    try {
      return cs = js2coffee.build(js);
    } catch (err) {
      return cs = err.message;
    } finally {
      socket.emit('result', cs);
    }
  });
});

server.listen(3000);
