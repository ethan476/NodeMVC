function indexController() {
    MVCController.child(this);
    this.super(); 
}

indexController.prototype.index = function() {
    Output.instance.append("Testing");
};

global.Controller = indexController;