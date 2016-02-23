/*global require, process */

(function () {

    'use strict';

    var http = require('http');
    var through = require('through2');
    
    var write = function(buffer) {
        var str = buffer.toString().toLocaleUpperCase();
        this.queue(str);
    };

    var server = http.createServer(function (req, res) {
        if(req.method == 'POST') {
            req.pipe(through(write)).pipe(res);
        }else{
            res.end();
        }
    });

    server.listen(process.argv[2]);
})();