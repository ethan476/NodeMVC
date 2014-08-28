var http = require("http");
var controller = require("./system/core/NodeController.js");

function NodeMVC() {

}

NodeMVC.prototype.listen = function(port) {
    this.port = port;
    this.http = http.createServer(function(request, response) {
        
    }).listen(this.port);
};


global.NodeMVC = NodeMVC;