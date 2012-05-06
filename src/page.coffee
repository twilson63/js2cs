module.exports = ->
  doctype 5
  html ->
    head ->
      title 'javascript to coffeescript'
      meta name: 'description', content: 'Convert Javascript 2 Coffeescript'
      meta name: 'keywords', content: 'coffeescript, javascript, convert javascript to coffeescript'
      meta name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'
      link rel: 'stylesheet', href: '/stylesheets/base.css'
      link rel: 'stylesheet', href: '/stylesheets/skeleton.css'
      link rel: 'stylesheet', href: '/stylesheets/layout.css'
      comment '[if lt IE 9]>\r\n\t<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>\r\n<![endif]'
    body ->
      script src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      script src: '/socket.io/socket.io.js'
      coffeescript ->
        $ ->
          socket = io.connect()
          socket.on 'result', (cs) ->
            $('textarea[name=coffee]').text cs
            $('#results').show()
          $('form').submit (e) ->
            e.preventDefault()
            socket.emit 'convert', $('textarea[name=javascript]',this).val()
            false
          $('form a').click (e) ->
            $('textarea').val('')

      div '.container', ->
        div '.row', style: 'margin-top: 25px;', ->
          div '.twelve.columns', ->
            h3 style: 'float: right;margin-right: 20px;color: rgba(0,0,0,.7);', 'Javascript to Coffeescript'
            h1 'js2cs'
            small 'Convert your JavaScript to CoffeeScript'
        form method: 'POST', action: '/convert', ->
          div '.row', ->
            div '.twelve.columns', ->
              textarea name: 'javascript', placeholder: '< insert your javascript here >', style: 'height:150px;width:98%', -> @js
          div '.row', ->
            div '.six.columns', ->
              button style: 'width: 100%', '<-- CONVERT -->'
            div '.six.columns', ->
              a '.button', href: '#', style: 'width: 90%;text-align: center;margin: 2.5px;', '<-- RESET -->'
          div '#results.row', style: 'display:none;', ->
            div '.twelve.columns', ->
              textarea name: 'coffee', placeholder: '< press [convert] and see your coffeescript >', style: 'height:150px;width:98%', -> @coffee
        div '.row', style: 'margin-bottom: 100px;', ->
          div '.four.columns', ->
            iframe src: 'http://markdotto.github.com/github-buttons/github-btn.html?user=twilson63&repo=js2cs&type=watch', allowtransparency: true, frameborder: "0", scrolling: "0", width: "62px", height: "20px;"
          div '.four.columns', ->
            a '.twitter-share-button', href: 'https://twitter.com/share', 'data-url': 'http://js2cs.nodejitsu.com', 'data-text': 'Convert your javascript to coffeescript! #coffeescript #nodejs', 'Tweet'
            script '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'
          div '.four.columns', ->
            a '.twitter-follow-button', href: 'https://twitter.com/twilson63', 'data-show-count': 'false', 'Follow @twilson63'
            script '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'
