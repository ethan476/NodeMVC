function Model() {
    Model.instance = this;
}

Model.prototype.myMethod = function() {
    console.log("default");
}

Model.child = function(child) {
    for (var property in this.prototype) {
        if (typeof child[property] === "undefined") {
            child[property] = this.prototype[property];
        }
    }
    child["super"] = this.prototype.constructor;
};

global.Model = Model;