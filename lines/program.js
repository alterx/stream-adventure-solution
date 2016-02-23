/* global process, require */

(function() {

    'use strict';

    var through = require('through2');
    var split = require('split');

    var line = 0;
    var write = function (buf){
        var str = buf.toString();
        var strfinal = (line % 2 === 0) ? str.toLocaleLowerCase() + '\n' : str.toLocaleUpperCase() + '\n';

        this.queue(strfinal);
        line++;
    };

    var tr = through(write);
    process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
    
})();