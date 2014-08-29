function indexController() {
    MVCController.child(this);
    this.super(); 
}

indexController.prototype.index = function() {

};

global.Controller = indexController;