
module.exports = function() {
  doctype(5);
  return html(function() {
    head(function() {
      title('javascript to coffeescript');
      meta({
        name: 'description',
        content: 'Convert Javascript 2 Coffeescript'
      });
      meta({
        name: 'keywords',
        content: 'coffeescript, javascript, convert javascript to coffeescript'
      });
      meta({
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      });
      link({
        href: 'http://fonts.googleapis.com/css?family=Orbitron',
        rel: 'stylesheet',
        type: 'text/css'
      });
      link({
        rel: 'stylesheet',
        href: '/stylesheets/base.css'
      });
      link({
        rel: 'stylesheet',
        href: '/stylesheets/skeleton.css'
      });
      link({
        rel: 'stylesheet',
        href: '/stylesheets/layout.css'
      });
      link({
        rel: 'stylesheet',
        href: '/stylesheets/app.css'
      });
      return comment('[if lt IE 9]>\r\n\t<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>\r\n<![endif]');
    });
    return body(function() {
      div('.container', function() {
        div('.row', {
          style: 'margin-top: 25px;'
        }, function() {
          return h3('.fit', 'Javascript to Coffeescript');
        });
        div('.row', function() {
          return div('.twelve.columns', function() {
            return textarea({
              name: 'javascript',
              placeholder: 'var square = function(x) { return x * x; }'
            });
          });
        });
        div('.row', function() {
          div('.six.columns', function() {
            return a('#convert.button', 'CONVERT');
          });
          return div('.six.columns', function() {
            return a('#reset.button', {
              href: '#'
            }, 'RESET');
          });
        });
        div('#results.row', {
          style: 'display:none;'
        }, function() {
          return div('.twelve.columns', function() {
            return textarea({
              name: 'coffee'
            });
          });
        });
        div('.row', function() {
          return h3('.fit', 'News and Updates');
        });
        return div('.row', {
          style: 'margin-bottom: 100px;'
        }, function() {
          div('.four.columns', function() {
            return iframe({
              src: 'http://markdotto.github.com/github-buttons/github-btn.html?user=twilson63&repo=js2cs&type=watch',
              allowtransparency: true,
              frameborder: "0",
              scrolling: "0",
              width: "62px",
              height: "20px;"
            });
          });
          div('.four.columns', function() {
            a('.twitter-share-button', {
              href: 'https://twitter.com/share',
              'data-url': 'http://js2cs.nodejitsu.com',
              'data-text': 'Convert your javascript to coffeescript! #coffeescript #nodejs'
            }, 'Tweet');
            return script('!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");');
          });
          return div('.four.columns', function() {
            a('.twitter-follow-button', {
              href: 'https://twitter.com/twilson63',
              'data-show-count': 'false'
            }, 'Follow @twilson63');
            return script('!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");');
          });
        });
      });
      script({
        src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      });
      script({
        src: '/javascripts/fittext.js'
      });
      script({
        src: '/socket.io/socket.io.js'
      });
      text('<script type="text/javascript">\n  var _gauges = _gauges || [];\n  (function() {\n    var t   = document.createElement(\'script\');\n    t.type  = \'text/javascript\';\n    t.async = true;\n    t.id    = \'gauges-tracker\';\n    t.setAttribute(\'data-site-id\', \'4fac7fa7f5a1f5632e0000d2\');\n    t.src = \'//secure.gaug.es/track.js\';\n    var s = document.getElementsByTagName(\'script\')[0];\n    s.parentNode.insertBefore(t, s);\n  })();\n</script>');
      return coffeescript(function() {
        return $(function() {
          var socket;
          socket = io.connect();
          socket.on('result', function(cs) {
            $('textarea[name=coffee]').val(cs);
            return $('#results').show();
          });
          $('.fit').fitText(1.2, {
            minFontSize: '13px',
            maxFontSize: '40px'
          });
          $('#convert').click(function() {
            return socket.emit('convert', $('textarea[name=javascript]').val());
          });
          return $('#reset').click(function() {
            $('textarea').val('');
            return $('#results').hide();
          });
        });
      });
    });
  });
};
