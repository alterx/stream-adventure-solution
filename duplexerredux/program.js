/*global require, module */

(function () {

    'use strict';

    var duplexer = require('duplexer2');
    var through = require('through2').obj;

    module.exports = function (counter) {
        var input = through(write, end);
        var countries = {};
        
        function write(buffer, enc, cb) {
            countries[buffer.country] = (countries[buffer.country] || 0) + 1;
            cb();
        }

        function end(done) {
            counter.setCounts(countries);
            done();
        }
        
        return duplexer(input, counter);
    };

})();