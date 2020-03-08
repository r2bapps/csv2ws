const multer = require('multer');
const path = require('path');

const { MAX_FILE_SIZE_BYTES, ATTACHMENTS_BASE_PATH, SUPPORTED_FILES, UPLOAD_FILES_PATH } = require('../../config');

class UnsupportedFileExtensionException extends Error { };

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, path.join(ATTACHMENTS_BASE_PATH, UPLOAD_FILES_PATH));
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

const fileFilter = function (req, file, cb) {
  if (SUPPORTED_FILES.includes(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(new UnsupportedFileExtensionException(`Only '${SUPPORTED_FILES.join(', ')}' extensions are allowed`), null);
  }
};

const limits = { fileSize: MAX_FILE_SIZE_BYTES };

const upload = multer({ storage, fileFilter, limits }).single('data');

module.exports = { upload, UnsupportedFileExtensionException };
