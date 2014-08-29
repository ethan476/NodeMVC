var http = require("http");

function NodeMVC(path) {
    if (typeof path === "string") {
        NodeMVC.mvcPath = path;
    } else {
        NodeMVC.mvcPath = "";
    }
    
    require("./system/core/Loader.js");
    
    this.loader = new Loader();
    this.loader.preLoad();
    
    this.router = new Router();
    
    this.configuration = new Configuration();
    this.configuration.load("routes", "./system/configurations/routes.json");
    this.configuration.load("configuration", "./system/configurations/configuration.json");
}

NodeMVC.prototype.listen = function(port) {
    var self = this;
    this.port = port;
    this.http = http.createServer(function(request, response) {
        var output = new Output();
        self.router.route(request, response, function(err) {
            if (err) { 
                output.build(response, "Error code: " + err);
            } else {
                output.build(response);
            }
        });
    }).listen(this.port);
};

global.NodeMVC = NodeMVC;