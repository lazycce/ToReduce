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
  setWindowSizeByType: 'controller.app.setWindowSizeByType',
  setWindowAlwaysOnTop: 'controller.app.setWindowAlwaysOnTop',
  showWindow: 'controller.app.showWindow',
  // 正常接口
  login: 'controller.api.login',
  getAlarmList: 'controller.api.getAlarmList',
  // 打开外部链接
  openExternal: 'controller.app.openExternal',
  // 截图
  captureWindow: 'controller.app.captureWindow'
}

export {
  ipcApiRoute
}

