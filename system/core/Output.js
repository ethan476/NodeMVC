function Output() {
    Output.instance = this;
    this.buffer = new String();
}

Output.prototype.append = function(data) {
    this.buffer += data.toString();
}

Output.prototype.build = function() {
    return this.buffer;
}

global.Output = Output;