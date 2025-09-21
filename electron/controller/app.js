'use strict';

const { Controller } = require('ee-core');
const Services = require('ee-core/services');
const {shell} = require('electron');
const CoreWindow = require('ee-core/electron/window');

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

    async hideWindow() {
        await Services.get('app').hideWindow();
    }

   async showWindow() {
        const mainWindow = CoreWindow.getMainWindow();
        mainWindow.center();
        await mainWindow.show();
    }

    async setAutoLaunch(enable) {
        await Services.get('app').setAutoLaunch(enable);
    }

    /**
     * 打开外部链接
     * @param {Object} args - 参数对象
     * @param {string} args.url - 要打开的URL
     */
    async openExternal(args) {
        const { url } = args;
        if (!url) {
            throw new Error('URL is required');
        }
        await shell.openExternal(url);
    }

    /**
     * 捕获窗口截图
     * @returns {Promise<Buffer>} 截图的 Buffer 数据
     */
    async captureWindow() {
        const mainWindow = CoreWindow.getMainWindow();
        const image = await mainWindow.webContents.capturePage();
        return image.toPNG();
    }
}

AppController.toString = () => '[class AppController]';
module.exports = AppController;
