function indexController() {
    MVCController.child(this);
    this.super(); 
}

indexController.prototype.index = function() {
    this.loader.library("test");
    Output.instance.append("<h2>Hello, World!</h2>");
};

global.Controller = indexController;