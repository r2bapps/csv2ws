const SUPPORTED_FILES = ['.csv', '.zip'];
const UPLOAD_FILES_PATH = 'uploaded';
const UNZIPPED_FILES_PATH = 'unzipped';
const JSON_FILES_PATH = 'processed';
const ATTACHMENTS_BASE_PATH = './attachments';
const MAX_FILE_SIZE_BYTES = '52428800'; // 50MB
const BASE_API = '/api';

module.exports = { 
    MAX_FILE_SIZE_BYTES, 
    ATTACHMENTS_BASE_PATH, 
    SUPPORTED_FILES, 
    UPLOAD_FILES_PATH, 
    UNZIPPED_FILES_PATH, 
    JSON_FILES_PATH,
    BASE_API
};