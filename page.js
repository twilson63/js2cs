
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
      return comment('[if lt IE 9]>\r\n\t<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>\r\n<![endif]');
    });
    return body(function() {
      script({
        src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      });
      script({
        src: '/socket.io/socket.io.js'
      });
      coffeescript(function() {
        return $(function() {
          var socket;
          socket = io.connect();
          socket.on('result', function(cs) {
            $('textarea[name=coffee]').text(cs);
            return $('#results').show();
          });
          $('form').submit(function(e) {
            e.preventDefault();
            socket.emit('convert', $('textarea[name=javascript]', this).val());
            return false;
          });
          return $('form a').click(function(e) {
            return $('textarea').val('');
          });
        });
      });
      return div('.container', function() {
        div('.row', {
          style: 'margin-top: 25px;'
        }, function() {
          return div('.twelve.columns', function() {
            h3({
              style: 'float: right;margin-right: 20px;color: rgba(0,0,0,.7);'
            }, 'Javascript to Coffeescript');
            h1('js2cs');
            return small('Convert your JavaScript to CoffeeScript');
          });
        });
        form({
          method: 'POST',
          action: '/convert'
        }, function() {
          div('.row', function() {
            return div('.twelve.columns', function() {
              return textarea({
                name: 'javascript',
                placeholder: '< insert your javascript here >',
                style: 'height:150px;width:98%'
              }, function() {
                return this.js;
              });
            });
          });
          div('.row', function() {
            div('.six.columns', function() {
              return button({
                style: 'width: 100%'
              }, '<-- CONVERT -->');
            });
            return div('.six.columns', function() {
              return a('.button', {
                href: '#',
                style: 'width: 90%;text-align: center;margin: 2.5px;'
              }, '<-- RESET -->');
            });
          });
          return div('#results.row', {
            style: 'display:none;'
          }, function() {
            return div('.twelve.columns', function() {
              return textarea({
                name: 'coffee',
                placeholder: '< press [convert] and see your coffeescript >',
                style: 'height:150px;width:98%'
              }, function() {
                return this.coffee;
              });
            });
          });
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
    });
  });
};
