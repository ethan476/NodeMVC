function Configuration() {
    Configuration.instance = this;
}

Configuration.prototype.load = function(name, path) {
    if (path.charAt(0) !== '/') {
        this[name] = require(process.cwd() + "/" + path);
    } else {
        this[name] = require(path);
    }
};

global.Configuration = Configuration;