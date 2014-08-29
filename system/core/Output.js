function Output() {
    Output.instance = this;
    
    this.buffer = "";
    
    this.responseCode = 200;
    
    this.headers = {
        "Content-type": "text/html"
    };
}

Output.prototype.setResponseCode = function(responseCode) {
    /* IsInt() */
    if (responseCode === +responseCode && responseCode === (responseCode|0)) {
        this.responseCode = responseCode;
    }
};

Output.prototype.setHeader = function(headerTitle, headerData) {
    if (typeof headerTitle === "string" && typeof headerData === "string") {
        this.headers[headerTitle] = headerData;
    }
};

Output.prototype.setBuffer = function(data) {
    this.buffer = data.toString();
};

Output.prototype.append = function(data) {
    this.buffer += data.toString();
};

Output.prototype.build = function(response, dataOverride) {
    if (typeof dataOverride !== "undefined") {
        this.setBuffer(dataOverride);
    }
    response.writeHead(this.responseCode, this.headers);
    response.write(this.buffer);
    response.end();
};

global.Output = Output;