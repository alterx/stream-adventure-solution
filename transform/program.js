/*global process, require */

(function () {

    'use strict';

    var through = require('through2');

    var write = function (buffer){
        var str = buffer.toString().toLocaleUpperCase();
        this.queue(str);
    };

    var tr = through(write);
    process.stdin.pipe(tr).pipe(process.stdout);
    
})();