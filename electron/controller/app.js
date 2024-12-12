'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const {nativeTheme} = require("electron/main");
const {
    phoneWindowSize,
    pcWindowSize
} = require('../common/appConfig');

/**
 * app
 * @class
 */
class AppController extends Controller {

    /**
     * setWindowOpacity
     */
    async setWindowOpacity (args) {
        await Services.get('app').setWindowOpacity(args);
    }

    async setWindowAlwaysOnTop(args) {
        await Services.get('app').setWindowAlwaysOnTop(args);
    }

    async themeToggle(args) {
        await Services.get('app').themeToggle(args);
    }

    async setWindowSize(args) {
        await Services.get('app').setWindowSize(args);
    }

    async setWindowSizeByType({ type }) {
        console.log('type', type)
        const typeMap = {
            pc: pcWindowSize,
            phone: phoneWindowSize
        }
        await Services.get('app').setWindowSize(typeMap[type])
    }

    async hideWindow() {
        await Services.get('app').hideWindow();
    }
}

AppController.toString = () => '[class AppController]';
module.exports = AppController;
