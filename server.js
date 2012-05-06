<<<<<<< HEAD
var cc, filed, http, io, js2coffee, page, server, sio;

http = require('http');

cc = require('coffeecup');

js2coffee = require('js2coffee');

page = require('./page');
=======
var app, baseCss, coffeecup, fs, http, io, js2coffee, layoutCss, page, sio, skeletonCss;

http = require('http');

coffeecup = require('coffeecup');

js2coffee = require('js2coffee');

fs = require('fs');

baseCss = fs.readFileSync('./public/stylesheets/base.css');

skeletonCss = fs.readFileSync('./public/stylesheets/skeleton.css');

layoutCss = fs.readFileSync('./public/stylesheets/layout.css');

sio = require('socket.io');
>>>>>>> 91941712fd95fcdfd5ccedd15083b1700fd2862c

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

<<<<<<< HEAD
io = sio.listen(server);
=======
app = http.createServer(function(req, res) {
  console.log(req.url);
  if (req.url === '/') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    return res.end(coffeecup.render(page, {
      js: '',
      coffee: ''
    }));
  } else if (req.url === '/favicon.ico') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    return res.end();
  } else if (req.url === '/stylesheets/base.css') {
    res.writeHead(200, {
      'content-type': 'text/css'
    });
    return res.end(baseCss);
  } else if (req.url === '/stylesheets/skeleton.css') {
    res.writeHead(200, {
      'content-type': 'text/css'
    });
    return res.end(skeletonCss);
  } else if (req.url === '/stylesheets/layout.css') {
    res.writeHead(200, {
      'content-type': 'text/css'
    });
    return res.end(layoutCss);
  }
});

io = sio.listen(app);
>>>>>>> 91941712fd95fcdfd5ccedd15083b1700fd2862c

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

<<<<<<< HEAD
server.listen(3000);
=======
app.listen(3000);
>>>>>>> 91941712fd95fcdfd5ccedd15083b1700fd2862c
