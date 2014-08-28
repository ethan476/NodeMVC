function NodeController() {
    console.log("NodeController()");
}

NodeController.prototype.myMethod = function() {
    console.log("default");
}

NodeController.child = function(child) {
    for (var property in this.prototype) {
        if (typeof child[property] === "undefined") {
            child[property] = this.prototype[property];
        }
    }
    child["super"] = this.prototype.constructor;
};

global.NodeController = NodeController;
