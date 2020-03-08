const fs = require('fs-extra');
const path = require('path');

const { ATTACHMENTS_BASE_PATH, JSON_FILES_PATH, BASE_API } = require('../config');

function sendFile(filename, res) {
    const file = path.join(ATTACHMENTS_BASE_PATH, JSON_FILES_PATH, `${filename}.json`);
    if (fs.existsSync(file)) {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.end(fs.readFileSync(file, 'utf8'));
    } else {
        res.sendStatus(404);
    }
};

function sendHtml(res) {
    const urls = fs.readdirSync(path.join(ATTACHMENTS_BASE_PATH, JSON_FILES_PATH))
        .map(file => {
            const filename = file.split('.')[0];
            const href = path.join(BASE_API, filename);
            return `<li><a href="${href}">${filename}</a></li>`;
        });
    const content = `<!DOCTYPE html><html><head><base href="http://localhost:${process.env.PORT || 8080}/" /></head><body><ul>${urls.join('')}</ul></body></html>`;
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=iso-8859-1');
    res.end(content);
};

module.exports = { sendFile, sendHtml };
