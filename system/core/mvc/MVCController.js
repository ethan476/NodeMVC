function MVCController() {
    MVCController.instance = this;
}

MVCController.child = function(child) {
    for (var property in this.prototype) {
        if (typeof child[property] === "undefined") {
            child[property] = this.prototype[property];
        }
    }
    child["super"] = this.prototype.constructor;
};

global.MVCController = MVCController;
