var path = require('path')
var router = require('./router')

function startServer(port, dirname, logger) {
    var express = require('express')
    var http = require('http')

    var app = express()
    var server = http.createServer(app)

    if (port === true || port === false) {
        port = null
    }
    port = port || 4567
    app.set('port', port)
    app.set('views', path.join(dirname + '../views'))
    app.set('view engine', 'jade')
    app.use(express.favicon())
    app.use(express.logger('dev'))
    app.use(express.bodyParser())
    app.use(express.methodOverride())

    // routes
    app.use(app.router)
    app.use(express.static(path.join(dirname, '../')))

    // add error handler
    if ('development' == app.get('env')) {
        app.use(express.errorHandler())
    }

    router.route(app)

    http.createServer(app).listen(port, function(){
        logger.ok('Express server listening on port ' + port + ' in ' + app.get('env') + ' mode.')
    })
}

exports.startServer = startServer