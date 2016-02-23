/* global process, require */

(function() {

    'use strict';

    var fs = require('fs');
    var fileName = process.argv[2];

    
    fs.createReadStream(fileName).pipe(process.stdout);
})();