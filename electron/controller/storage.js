'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const { nativeTheme} = require("electron/main");

/**
 * StorageController
 * @class
 */
class StorageController extends Controller {

    async init() {
        return await Services.get('storage').init();
    }

    async reset() {
        return await Services.get('storage').reset();
    }

    async selectWebList(args) {
        return await Services.get('storage').selectWebList(args);
    }

    async addWeb(args) {
        return await Services.get('storage').addWeb(args);
    }

    async selectNovelList(args) {
        return await Services.get('storage').selectNovelList(args);
    }

    async addNovel(args) {
        await Services.get('storage').addNovel(args)
    }

    async getNovelDetail(args) {
        return await Services.get('storage').getNovelDetail(args.novelId)
    }
}

StorageController.toString = () => '[class StorageController]';
module.exports = StorageController;
