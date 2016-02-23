/*global process, require */

(function() {
    
    'use strict';
    
    var request = require('request');

    var response = request.post('http://localhost:8099');
    process.stdin.pipe(response).pipe(process.stdout);
    
})();