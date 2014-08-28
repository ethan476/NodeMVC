require("./NodeMVC");

var mvc = new NodeMVC();
mvc.listen(8070);

require("./app/controllers/index.js");

var controller = new Controller();
controller.a();