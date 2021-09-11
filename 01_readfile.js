var fs = require("fs");

fs.readFile("./hello.txt", function (error, data) {
    console.log(data.toString());
});

var fsa = require('fs');
fsa.writeFile('./hello.txt',"你好，我是node.js",function(error){
    console.log('succesess')
})