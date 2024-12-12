'use strict';

const { Service } = require('ee-core');
const fs = require('fs');

/**
 * 文件读取
 * @class
 */
class FileService extends Service {

    async getLocalTxtFileContent (args) {
        console.log(args)
        const { localPath, contentType } = args
        try {
            return fs.readFileSync(localPath, contentType);
        } catch (error) {
            console.log(error)
            return { error: error.message };
        }
    }
}

module.exports = FileService;
