var url = require("url");
var fs = require("fs");

function Router() {

}

Router.prototype.route = function(request, response, callback) {
    var uri = url.parse(request.url).pathname;

    if (uri.charAt(0) === '/') {
        uri = uri.substr(1);
    }
    if (uri.charAt(uri.length - 1) === '/') {
        uri = uri.substr(0, -1);
    }

    var splitUri = uri.split("/");
    var routingData = this.parseController(splitUri);

    if (routingData.length === 0) {
        callback(true);
    }

    var configuration = Configuration.instance["configuration"];
    if (typeof configuration !== "undefined") {
        if (typeof configuration["paths"] !== "undefined") {
            if (typeof configuration["paths"]["controllers"] !== "undefined") {
                for (var i = 0; i < configuration["paths"]["controllers"].length; i++) {
                    configuration["paths"]["controllers"][i] += (routingData["controller"] + ".js");
                    if (configuration["paths"]["controllers"][i].charAt(0) !== '/') {
                        configuration["paths"]["controllers"][i] = process.cwd() + "/" + configuration["paths"]["controllers"][i];
                    }
                    if (fs.existsSync(configuration["paths"]["controllers"][i])) {
                        require(configuration["paths"]["controllers"][i]);
                        if (routingData["method"] === "" || typeof routingData["method"] === "undefined") {
                            routingData["method"] = "index";
                        }

                        if (typeof Controller.prototype[routingData["method"]] !== "undefined") {
                            var controller = new Controller();
                            controller[routingData["method"]].apply(controller, routingData["args"]);
                            callback(false);
                        }
                        break;
                    } else {
                        callback(true);
                    }
                }
            } else {
                callback(true);
            }
        } else {
            callback(true);
        }
    } else {
        callback(true);
    } 
};

Router.prototype.parseController = function(splitUri) {
    var routingData = {};

    if (typeof Configuration.instance["routes"] !== "undefined") {
        routingData["controller"] = splitUri[0];
        if (routingData["controller"] === "") {
            if (typeof Configuration.instance["routes"]["defaults"] !== "undefined") {
                if (typeof Configuration.instance["routes"]["defaults"]["controller"] !== "undefined")
                    routingData["controller"] = Configuration.instance["routes"]["defaults"]["controller"];
            }
        }
    }
    if (splitUri.length > 1) {
        routingData["method"] = splitUri[1];
    }
    if (splitUri.length > 2) {
        routingData["args"] = splitUri.slice(2);
    }


    if (typeof Configuration.instance["routes"]["overrides"] !== "undefined") {
        var override = Configuration.instance["routes"]["overrides"][routingData["controller"]];
        if (typeof override !== "undefined") {
            var controller = override["controller"];
            var method = override["method"];
            var args = override["args"];

            if (typeof method[routingData["method"]] !== "undefined") {
                routingData["method"] = method[routingData["method"]];
            }

            for (var i = 0; i < routingData["args"].length; i++) {
                if (typeof args[routingData["args"][i]] !== "undefined") {
                    routingData["args"][i] = args[routingData["args"][i]];
                    break;
                }
            }
        }
    }
    return routingData;
};

global.Router = Router;
