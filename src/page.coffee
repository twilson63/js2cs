module.exports = ->
  doctype 5
  html ->
    head ->
      title 'javascript to coffeescript'
      meta name: 'description', content: 'Convert Javascript 2 Coffeescript'
      meta name: 'keywords', content: 'coffeescript, javascript, convert javascript to coffeescript'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'
      link href: 'http://fonts.googleapis.com/css?family=Orbitron', rel: 'stylesheet', type: 'text/css'
      link rel: 'stylesheet', href: '/stylesheets/base.css'
      link rel: 'stylesheet', href: '/stylesheets/skeleton.css'
      link rel: 'stylesheet', href: '/stylesheets/layout.css'
      link rel: 'stylesheet', href: '/stylesheets/app.css'
      comment '[if lt IE 9]>\r\n\t<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>\r\n<![endif]'
    body ->
      div '.container', ->
        div '.row', style: 'margin-top: 25px;', -> h3 '.fit','Javascript to Coffeescript'
        div '.row', ->
          div '.twelve.columns', ->
            textarea name: 'javascript', placeholder: 'var square = function(x) { return x * x; }'
        div '.row', ->
          div '.six.columns', -> a '#convert.button', 'CONVERT'
          div '.six.columns', -> a '#reset.button', href: '#', 'RESET'
        div '#results.row', style: 'display:none;', ->
          div '.twelve.columns', -> textarea name: 'coffee'
        div '.row', -> h3 '.fit', 'News and Updates'
        div '.row', style: 'margin-bottom: 100px;', ->
          div '.four.columns', ->
            iframe src: 'http://markdotto.github.com/github-buttons/github-btn.html?user=twilson63&repo=js2cs&type=watch', allowtransparency: true, frameborder: "0", scrolling: "0", width: "62px", height: "20px;"
          div '.four.columns', ->
            a '.twitter-share-button', href: 'https://twitter.com/share', 'data-url': 'http://js2cs.nodejitsu.com', 'data-text': 'Convert your javascript to coffeescript! #coffeescript #nodejs', 'Tweet'
            script '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'
          div '.four.columns', ->
            a '.twitter-follow-button', href: 'https://twitter.com/twilson63', 'data-show-count': 'false', 'Follow @twilson63'
            script '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'

      script src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      script src: '/javascripts/fittext.js'
      script src: '/socket.io/socket.io.js'
      coffeescript ->
        $ ->
          socket = io.connect()
          socket.on 'result', (cs) -> $('textarea[name=coffee]').val(cs); $('#results').show()
          $('.fit').fitText(1.2, { minFontSize: '13px', maxFontSize: '40px' })
          $('#convert').click -> socket.emit 'convert', $('textarea[name=javascript]').val()
          $('#reset').click -> $('textarea').val(''); $('#results').hide()

