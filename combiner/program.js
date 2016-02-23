/* global require, module */
(function() {
    
    'use strict';

    var combine = require('stream-combiner');
    var through = require('through2');
    var split = require('split');
    var zlib = require('zlib');

    module.exports = function () {
        var grouper = through(write, end);
        var currentGenre;

        function write (stream, enc, cb) {
            if(stream.length === 0) return cb();
            
            var json = JSON.parse(stream);

            if(json.type === 'genre') {
                if(currentGenre) {
                    var stringified = JSON.stringify(currentGenre)  + '\n';
                    this.push(stringified);
                }
                currentGenre = { name: json.name, books: [] };
            
            }
            if(json.type === 'book') {
                currentGenre.books.push(json.name);
            }
            cb();
        }
        
        function end (next) {
            if(currentGenre) {
                var stringified = JSON.stringify(currentGenre)  + '\n';
                this.push(stringified);
            }
            next();
        }

        return combine(split(), grouper, zlib.createGzip());
    };

})();