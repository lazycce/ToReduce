'use strict';

const CoreWindow = require('ee-core/electron/window');
const { Service } = require('ee-core');
const { nativeTheme } = require('electron/main')
const { app } = require('electron');
const path = require('path');
const { exec } = require('child_process');

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

    /**
     * 设置开机自启动
     * @param {boolean} enable - 是否开启自启动
     */
    async setAutoLaunch(enable) {
        if (process.platform !== 'win32') {
            console.log('Auto-launch is only supported on Windows.');
            return;
        }

        const appName = 'ToReduce';
        const exePath = `"${process.execPath}"`;
        const key = `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`;

        const command = enable
            ? `reg add "${key}" /v "${appName}" /t REG_SZ /d ${exePath} /f`
            : `reg delete "${key}" /v "${appName}" /f`;

        exec(command, (error) => {
            if (error) {
                console.error(`Failed to ${enable ? 'enable' : 'disable'} auto-launch: ${error.message}`);
                return;
            }
            console.log(`Auto-launch ${enable ? 'enabled' : 'disabled'} successfully.`);
        });
    }
}

AppService.toString = () => '[class AppService]';
module.exports = AppService;
