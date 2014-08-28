function IndexController() {
    NodeController.child(this);
    this.super();
    
    
}

IndexController.prototype.myMethod = function() {
    console.log("Override");
}


global.Controller = IndexController;