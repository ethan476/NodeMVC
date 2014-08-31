function MVCController() {
    MVCController.instance = this;
    
    this.loader = Loader.instance;
    this.output = Output.instance;
}

MVCController.child = function(child) {
    if (Controller !== "undefined") {
        Controller.instance = this;
    }
    
    for (var property in this.prototype) {
        if (typeof child[property] === "undefined") {
            child[property] = this.prototype[property];
        }
    }
    child["super"] = this.prototype.constructor;
};

global.MVCController = MVCController;
