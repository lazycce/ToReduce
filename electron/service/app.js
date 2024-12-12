'use strict';

const CoreWindow = require('ee-core/electron/window');
const { Service } = require('ee-core');
const { nativeTheme } = require('electron/main')

/**
 * 示例服务（service层为单例）
 * @class
 */
class AppService extends Service {

    /**
     * 设置窗口透明度
     * @param args
     */
    async setWindowOpacity(args) {
        const { opacity } = args
        const mainWindow = CoreWindow.getMainWindow();
        const max = Math.max(0.02, opacity);
        mainWindow.setOpacity(max);
    }

    async setWindowAlwaysOnTop(args) {
        const { flag } = args;
        const mainWindow = CoreWindow.getMainWindow();
        mainWindow.setAlwaysOnTop(flag);
    }

    async themeToggle() {
        nativeTheme.themeSource = "dark"
    }

    /**
     * 设置窗体大小
     */
    async setWindowSize(args) {
        const  { width, height } = args;
        const mainWindow = CoreWindow.getMainWindow();
        mainWindow.setResizable(true);
        mainWindow.setSize(width, height, true);
    }

    /**
     * 隐藏缩小窗体
     */
    async hideWindow() {
        const mainWindow = CoreWindow.getMainWindow();
        mainWindow.hide();
    }
}

AppService.toString = () => '[class AppService]';
module.exports = AppService;
