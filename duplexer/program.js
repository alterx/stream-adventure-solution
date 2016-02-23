/*global require, module */

(function() {
    'use strict';
    
    var spawn = require('child_process').spawn;
    var duplexer = require('duplexer2');

    module.exports = function (cmd, args) {
        // spawn the process and return a single stream
        // joining together the stdin and stdout here
        var process = spawn(cmd, args);
        return duplexer(process.stdin, process.stdout);
    };
})();