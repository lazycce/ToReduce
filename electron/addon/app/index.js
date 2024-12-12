const { app, globalShortcut } = require('electron');
const Services = require('ee-core/services');
const CoreWindow = require('ee-core/electron/window');

/**
 * AppAddon
 */
class AppAddon {
    create () {
        const main = CoreWindow.getMainWindow();
        globalShortcut.register('Control+Q', () => {
            app.quit(); // 强制退出应用
        });
        globalShortcut.register('Control+Tab', () => {
            if (main.isVisible()) {
                main.hide();
            } else {
                main.show();
                main.focus();
            }
        });
        globalShortcut.register('Control+1', () => {
            const opacity = main.getOpacity();
            Services.get('app').setWindowOpacity({
                opacity: Math.max(0.01, opacity - 0.01)
            })
        })
        globalShortcut.register('Control+2', () => {
            const opacity = main.getOpacity();
            Services.get('app').setWindowOpacity({
                opacity: Math.min(1, opacity + 0.01)
            })
        })
    }
}

AppAddon.toString = () => '[class AppAddon]';
module.exports = AppAddon;
