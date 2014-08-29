var http = require("http");

function NodeMVC() {
    for (var i = 0; i < NodeMVC.requirements.length; i++) {
        require(NodeMVC.requirements[i]);
    }
    this.output = new Output();
    this.router = new Router();
    this.configuration = new Configuration();
    this.configuration.load("routes", "./system/configurations/routes.json");
    this.configuration.load("configuration", "./system/configurations/configuration.json");
}

NodeMVC.prototype.listen = function(port) {
    var self = this;
    this.port = port;
    this.http = http.createServer(function(request, response) {
        self.router.route(request, response, function(err) {
            if (err) {
                
            } else {
                response.writeHead(200, {
                    'Content-type': 'text/html'
                });
                response.write(Output.instance.build());
                response.end();
            }
        });
    }).listen(this.port);
};

NodeMVC.requirements = [
    "./system/core/mvc/MVCController.js",
    "./system/core/Output.js",
    "./system/core/Router.js",
    "./system/core/Configuration.js"
];

global.NodeMVC = NodeMVC;