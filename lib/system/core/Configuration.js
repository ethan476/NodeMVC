function Configuration() {
    Configuration.instance = this;
}

Configuration.prototype.load = function(name, path) {
    if (path.charAt(0) !== '/') {
        this[name] = require(process.cwd() + "/" + NodeMVC.mvcPath + "/" + path);
    } else {
        this[name] = require(path);
    }
};

Configuration.prototype.get = function() {
    var args = Array.prototype.slice.call(arguments, 0);

    try {
        var value = this[args[0]];
        for (var i = 1; i < args.length; i++) {
            value = value[args[i]];
        }
        return value;
    } catch (err) {
        return undefined;
    }
}

global.Configuration = Configuration;