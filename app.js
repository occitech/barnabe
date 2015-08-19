var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});

server.route({
    method: 'GET',
    path:'/tts/{message}/{voice?}',
    handler: function (request, reply) {
        var voice = request.params.voice ? encodeURIComponent(request.params.voice) : 'manon';
        reply('TTS | voice : ' + voice + ', message : ' + encodeURIComponent(request.params.message));
    }
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});
