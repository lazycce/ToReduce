'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');

/**
 * FileController
 * @class
 */
class FileController extends Controller {

    async getLocalTxtFileContent (args) {
        return await Services.get('file').getLocalTxtFileContent(args);
    }
}

FileController.toString = () => '[class FileController]';
module.exports = FileController;
