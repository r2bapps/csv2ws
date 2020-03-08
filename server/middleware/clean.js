const fs = require('fs-extra');

function clean(path) {
    return function(req, res, next) {
        fs.emptyDirSync(path);
        next();
    }
}

module.exports = clean;
