'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const { nativeTheme} = require("electron/main");

const storageService = 'storage'

/**
 * StorageController
 * @class
 */
class StorageController extends Controller {

    async init() {
        return await Services.get(storageService).init();
    }

    async reset() {
        return await Services.get(storageService).reset();
    }

    async selectWebList(args) {
        return await Services.get(storageService).selectWebList(args);
    }

    async addWeb(args) {
        return await Services.get(storageService).addWeb(args);
    }

    async removeWeb(args) {
        return await Services.get(storageService).removeWeb(args);
    }

    async selectNovelList(args) {
        return await Services.get(storageService).selectNovelList(args);
    }

    async addNovel(args) {
        await Services.get(storageService).addNovel(args)
    }

    async getNovelDetail(args) {
        return await Services.get(storageService).getNovelDetail(args.novelId)
    }
}

StorageController.toString = () => '[class StorageController]';
module.exports = StorageController;
