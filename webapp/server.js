"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
//for using an import here we need to configure the package.json
//setting the option module to commonjs
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.static('build'));
app.listen(port, function () {
    console.log('Webapp started on port ' + port);
}).on("error", function (error) {
    console.error('Error occured: ' + error.message);
});
