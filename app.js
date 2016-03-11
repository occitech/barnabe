var Hapi = require('hapi'),
    Path = require('path'),
    Inert = require('inert');

var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({
    port: 3000
});

server.register(Inert, function () {});

var io = require('socket.io')(server.listener);

server.route({
    method: 'GET',
    path: '/',
    handler : {
        file: 'index.html'
    }
});

server.route({
    method: 'GET',
    path:'/tts/{message}/{voice?}',
    handler: function (request, reply) {
        var voice = request.params.voice ? encodeURIComponent(request.params.voice) : 'Fabienne';
        var message = encodeURIComponent(request.params.message);
        var url = 'https://www.voxygen.fr/sites/all/modules/voxygen_voices/assets/proxy/index.php?method=redirect&text=' + message + '&voice=' + voice + '&ts=1439996064650';
        reply(url);
        io.emit('play', url);
    }
});

server.route({
    method: 'GET',
    path:'/play',
    handler: function (request, reply) {
        var url = request.query.url || false;
        reply(url);

        if (url) {
            io.emit('play', url);
        }
    }
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});
