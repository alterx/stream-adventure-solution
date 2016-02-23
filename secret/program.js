/* global require, process, console */
(function() {

    'use strict';
    
    var crypto = require('crypto');
    var tar = require('tar');
    var zlib = require('zlib');
    var concat = require('concat-stream');

    var parser = tar.Parse();
    parser.on('entry', function (e) {
        if (e.type !== 'File') return;

        var hash = crypto.createHash('md5', { encoding: 'hex' });
        e.pipe(hash).pipe(concat(function (hash) {
            console.log(hash + ' ' + e.path);
        }));
    });

    var cipher = process.argv[2];
    var pass = process.argv[3];
    process.stdin.pipe(crypto.createDecipher(cipher, pass)).pipe(zlib.createGunzip()).pipe(parser);
    
})();