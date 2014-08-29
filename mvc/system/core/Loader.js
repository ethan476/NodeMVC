function Loader() {
    Loader.instance = this;
}

Loader.prototype.library = function(library) {
    
}

Loader.prototype.preLoad = function() {
    for (var i = 0; i < Loader.preLoads.length; i++) {
        if (Loader.preLoads[i].charAt(0) !== '/') {
            Loader.preLoads[i] = process.cwd() + "/" + NodeMVC.mvcPath + "/" + Loader.preLoads[i];
        }
        require(Loader.preLoads[i]);
    }
};

Loader.preLoads = [
    "./system/core/mvc/MVCController.js",
    "./system/core/Output.js",
    "./system/core/Router.js",
    "./system/core/Configuration.js"
];

global.Loader = Loader;