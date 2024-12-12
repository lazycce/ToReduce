
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  setWindowOpacity: 'controller.app.setWindowOpacity',
  setWindowSize: 'controller.app.setWindowSize',
  hideWindow: 'controller.app.hideWindow',
  themeToggle: 'controller.app.themeToggle',
  reset: 'controller.storage.reset',
  addTestDataSqlite: 'controller.storage.test',
  selectWebList: 'controller.storage.selectWebList',
  selectNovelList: 'controller.storage.selectNovelList',
  addWeb: 'controller.storage.addWeb',
  addNovel: 'controller.storage.addNovel',
  getNovelDetail: 'controller.storage.getNovelDetail',
  setWindowSizeByType: 'controller.app.setWindowSizeByType',
  setWindowAlwaysOnTop: 'controller.app.setWindowAlwaysOnTop'
}

export {
  ipcApiRoute
}

