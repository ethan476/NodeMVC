var url = require("url");
var fs = require("fs");

function Router() {

}

Router.prototype.route = function(request, response, callback) {
    var self = this;
    var uri = url.parse(request.url).pathname;

    if (uri.charAt(0) === '/') {
        uri = uri.substr(1);
    }
    if (uri.charAt(uri.length - 1) === '/') {
        uri = uri.substr(0, -1);
    }

    var splitUri = uri.split("/");

    self.buildRoutingInfo(splitUri, function(err, info) {
        if (err) {
            callback(err);
        } else {
            self.loadController(info, function(err, controller) {
                if (err) {
                    callback(err);
                } else {
                    if (typeof controller[info["method"]] === "function") {
                        controller[info["method"]].apply(controller, info["args"]);
                        callback(false);
                    } else {
                        callback(404);
                    }
                }
            });
        }
    });
};

Router.prototype.buildRoutingInfo = function(splitUri, callback) {
    var info = {
        "controller": splitUri[0]
    };

    if (splitUri.length > 1) {
        info["method"] = splitUri[1];
    } else {
        info["method"] = "index";
    }
    
    if (splitUri.length > 2) {
        info["args"] = splitUri.slice(2);
    } else {
        info["args"] = [];
    }

    var overrides = Configuration.instance.get("routes", "overrides", info["controller"]);
    if (typeof overrides === "object") {
        if (typeof overrides["controller"] === "string") {
            info["controller"] = overrides["controller"];
        }

        if (typeof overrides["methods"] === "object") {
            for (var method in overrides["methods"]) {
                if (typeof method === "string") {
                    if (method === info["method"]) {
                        info["method"] = method;
                        break;
                    }
                }
            }
        }
        
        if (typeof overrides["args"] === "object") {
            for(var i = 0; i < info["args"].length; i++) {
                for(var arg in overrides["args"]) {
                    if (info["args"][i] === arg) {
                        info["args"][i] = overrides["args"][arg];
                    }
                }
            }
        }
    }
    callback(false, info);
};

Router.prototype.loadController = function(info, callback) {
    var paths = Configuration.instance.get("configuration", "paths", "controllers");

    if (typeof paths === "object") {
        for(var i = 0; i < paths.length; i++) {
            var path = paths[i] + "/" + info["controller"] + ".js";
            
            if (path.charAt(0) !== '/') {
                path = process.cwd() + "/" + NodeMVC.mvcPath + "/" + path;
            }
            
            if (fs.existsSync(path)) {
                require(path);
                callback(false, new Controller());
            } else {
                callback(404, undefined);
            }
        }
    } else {
        callback(500, undefined);
    }
};

global.Router = Router;
