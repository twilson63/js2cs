require 'coffee-script'
coffeecup = require 'coffeecup'
tako = require 'tako'
js2coffee = require 'js2coffee'
app = tako()

page = ->
  doctype 5
  html ->
    head ->
      title 'js2cs'
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
          $('form').submit (e) ->
            e.preventDefault()
            socket = io.connect()
            socket.on 'result', (cs) ->
              $('textarea[name=coffee]').text cs
            socket.emit 'convert', $('textarea[name=javascript]',this).val()
            false
          $('form a').click (e) ->
            $('textarea').val('')

      div '.container', ->
        h1 'js2cs'
        div style: 'float:right', ->
          a '.twitter-share-button', href: 'https://twitter.com/share', 'data-url': 'http://js2cs.nodejitsu.com', 'data-text': 'Convert your javascript to coffeescript! #coffeescript #nodejs', 'Tweet'
          script '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'
          br()
          a '.twitter-follow-button', href: 'https://twitter.com/twilson63', 'data-show-count': 'false', 'Follow @twilson63'
          script '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'

        small 'Convert your JavaScript to CoffeeScript'
        form method: 'POST', action: '/convert', ->
          p ->
            textarea name: 'javascript', placeholder: '< insert your javascript here >', style: 'height:150px;width:98%', -> @js
          p -> 
            button style: 'width: 48%', '<-- CONVERT -->'
            a '.button', href: '#', style: 'width: 48%;text-align: center;', '<-- RESET -->'

          p ->
            textarea name: 'coffee', placeholder: '< press [convert] and see your coffeescript >', style: 'height:150px;width:98%', -> @coffee

        div style: 'text-align:center', ->
          a href: 'https://github.com/twilson63/js2cs', 'View Source on Github'


app.route('/').methods('GET').html coffeecup.render(page, js: '', coffee: '')

app.sockets.on 'connection', (socket) ->
  socket.on 'convert', (js) ->
    cs = ""
    try 
      cs = js2coffee.build(js)
    catch err
      cs = err.message
    socket.emit 'result', cs

# app.route('/convert').json (req, resp) ->
#   req.on 'json', (data) -> resp.end coffee: js2coffee.build(data.js)

app.route('/*').files "#{__dirname}/public"
app.httpServer.listen 3000
