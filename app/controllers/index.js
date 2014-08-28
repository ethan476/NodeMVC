function indexController() {
    MVCController.child(this);
    this.super(); 
}

indexController.prototype.index = function() {
    Output.instance.append("test");
}

global.Controller = indexController;