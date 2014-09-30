var startServer = require('./index').startServer

startServer(6767, __dirname, {
    ok: function(msg) {
        console.log(msg);
    }
})