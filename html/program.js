/* global require, process */

(function() {
    'use strict';

    var trumpet = require('trumpet');
    var through = require('through2');
    var tr = trumpet();

    var stream = tr.select('.loud').createStream(); 

    stream.pipe(through(function(buffer, enc, cb){
        this.push(buffer.toString().toLocaleUpperCase());
        cb();
    })).pipe(stream);

    process.stdin.pipe(tr).pipe(process.stdout);
    
})();