const { InvalidZipFormatException } = require('./middleware/unzip');
const { InvalidCsvFormatException } = require('./middleware/csv2json');
const { UnsupportedFileExtensionException } = require('./middleware/upload');

function errorHandler(err, res) {
    if (err instanceof InvalidZipFormatException || 
        err instanceof InvalidCsvFormatException || 
        err instanceof UnsupportedFileExtensionException) {
        res.status(415).send(err.message);
    } else {
        res.status(500).send(err);
    }
};

module.exports = errorHandler;
