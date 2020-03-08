const csv = require('csvtojson');
const stringify = require('fast-json-stable-stringify');
const path = require('path');
const fs = require('fs-extra');

const { ATTACHMENTS_BASE_PATH, UNZIPPED_FILES_PATH, JSON_FILES_PATH } = require('../../config');

class InvalidCsvFormatException extends Error { };

function cleanCurrentPath() {
    fs.emptyDirSync(path.join(ATTACHMENTS_BASE_PATH, UNZIPPED_FILES_PATH));
};

const csv2json = async (req, res, next) => {
    let error;
    try {
        const files = fs.readdirSync(path.join(ATTACHMENTS_BASE_PATH, UNZIPPED_FILES_PATH));
        const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
        for (let csvFile of csvFiles) {
            const oldFilePath = path.join(ATTACHMENTS_BASE_PATH, UNZIPPED_FILES_PATH, csvFile);
            const newFilePath = path.join(ATTACHMENTS_BASE_PATH, JSON_FILES_PATH, `${path.parse(csvFile).name.toLowerCase()}.json`);
            const jsonObj = await csv().fromFile(oldFilePath);
            fs.writeFileSync(newFilePath, stringify(jsonObj), { encoding: 'utf8', flag: 'w' });
        }
    } catch (err) {
        error = new InvalidCsvFormatException(err);
    }
    cleanCurrentPath();
    if (error) {
        throw error;
    } else {
        next();
    }
};

module.exports = { csv2json, InvalidCsvFormatException };
