const createSysWebSql = `
CREATE TABLE sys_web
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name CHAR(50),
      icon Text,
      url Text,
      showType CHAR(50),
      category CHAR(50),
      sort INT
    );
`

const createSysNovel = `
CREATE TABLE sys_novel
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name CHAR(50),
      contentType CHAR(50),
      category CHAR(50),
      progress INT,
      wordReadCount INT,
      totalWordCount INT,
      charactersReadCount INT,
      chaptersCount INT,
      sort INT
    );
`

const createSysNovelDetail = `
CREATE TABLE sys_novel_detail
    (
      novelId INTEGER,
      content Text
    );
`

const createSysConfig = `
CREATE TABLE sys_config 
    (
        key CHAR(50),
        value CHAR(50)
    )
`

const sysWebTable = 'sys_web'
const sysNovelTable = 'sys_novel'
const sysNovelDetailTable = 'sys_novel_detail'
const sysConfigTable = 'sys_config'

const initWebData = [{
    name: '抖音',
    icon: '',
    url: 'https://www.douyin.com/?is_from_mobile_home=1&recommend=1',
    category: 'entertainment',
    showType: 'phone',
    sort: 1
}, {
    name: 'B站',
    icon: '',
    url: 'https://m.bilibili.com/',
    category: 'entertainment',
    showType: 'phone',
    sort: 2
}, {
    name: '百度',
    icon: '',
    url: 'https://www.baidu.com',
    category: 'study',
    showType: 'phone',
    sort: 1
}]

const initSysConfigData = [{
    key: 'alwaysOnTop',
    value: '0'
}]

module.exports =  {
    createSysWebSql,
    createSysNovel,
    createSysNovelDetail,
    createSysConfig,
    sysWebTable,
    sysNovelTable,
    sysNovelDetailTable,
    sysConfigTable,
    initWebData,
    initSysConfigData
}
