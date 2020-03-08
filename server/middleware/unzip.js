const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs-extra');

const { ATTACHMENTS_BASE_PATH, UPLOAD_FILES_PATH, UNZIPPED_FILES_PATH } = require('../../config');

class InvalidZipFormatException extends Error { };

function cleanCurrentPath() {
  fs.emptyDirSync(path.join(ATTACHMENTS_BASE_PATH, UPLOAD_FILES_PATH));
};

const unzip = (req, res, next) => {
  let error;
  const overwrite = true;
  fs.readdirSync(path.join(ATTACHMENTS_BASE_PATH, UPLOAD_FILES_PATH))
    .filter(file => path.extname(file).toLowerCase() === '.csv')
    .forEach(csvFile => {
      fs.copyFileSync(path.join(ATTACHMENTS_BASE_PATH, UPLOAD_FILES_PATH, csvFile), path.join(ATTACHMENTS_BASE_PATH, UNZIPPED_FILES_PATH, csvFile));
    });
  try {
    fs.readdirSync(path.join(ATTACHMENTS_BASE_PATH, UPLOAD_FILES_PATH))
      .filter(file => path.extname(file).toLowerCase() === '.zip')
      .forEach(zipFile => {
        (new AdmZip(path.join(ATTACHMENTS_BASE_PATH, UPLOAD_FILES_PATH, zipFile)))
          .extractAllTo(path.join(ATTACHMENTS_BASE_PATH, UNZIPPED_FILES_PATH), overwrite);
      });
  } catch (err) {
    // Invalid or unsupported zip format
    error = new InvalidZipFormatException(err);
  }
  cleanCurrentPath();
  if (error) {
    throw error;
  } else {
    next();
  }
};


module.exports = {
  unzip,
  InvalidZipFormatException
};
