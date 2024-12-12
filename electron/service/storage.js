'use strict';

const { Service } = require('ee-core');
const Storage = require('ee-core/storage');
const { app } = require('electron');
const _ = require('lodash');
const {
    sysWebTable,
    sysNovelTable,
    sysNovelDetailTable,
    createSysWebSql,
    createSysNovel,
    createSysNovelDetail,
    createSysConfig,
    initWebData,
    initSysConfigData
} = require('./../common/initCreateSql')
const {sysConfigTable} = require("../common/initCreateSql");
const CoreWindow = require('ee-core/electron/window');

/**
 * 数据存储
 * @class
 */
class StorageService extends Service {

    constructor (ctx) {
        super(ctx);

        // sqlite数据库
        let sqliteOptions = {
            driver: 'sqlite',
            default: {
                timeout: 6000,
                verbose: console.log // 打印sql语法
            }
        }
        this.sqliteDB = Storage.connection('sqlite.db', sqliteOptions);
    }

    async init() {
        await this.checkAndCreateTable(sysWebTable, createSysWebSql);
        await this.checkAndCreateTable(sysNovelTable, createSysNovel);
        await this.checkAndCreateTable(sysNovelDetailTable, createSysNovelDetail);
        await this.checkAndCreateTable(sysConfigTable, createSysConfig)
        // 初始化数据
        const webList = await this.selectAllWebList()
        if (webList.length > 0) return;
        initWebData.forEach(item => {
            this.addWeb(item);
        })
    }

    async reset() {
        await this.deleteTable(sysWebTable);
        await this.deleteTable(sysNovelTable);
        await this.deleteTable(sysNovelDetailTable);
        await this.init()
        app.quit();
    }

    async deleteTable (tableName = '') {
        await this.sqliteDB.db.exec(`DROP TABLE IF EXISTS ${tableName}`)
    }

    async checkAndCreateTable(tableName = '', createTableSql = '') {
        if (_.isEmpty(tableName)) {
            throw new Error(`table name is required`);
        }

        if (_.isEmpty(createTableSql)) {
            throw new Error(`create table sql is error`);
        }

        // 检查表是否存在
        const userTable = this.sqliteDB.db.prepare('SELECT * FROM sqlite_master WHERE type=? AND name = ?');
        const result = userTable.get('table', tableName);
        if (result) {
            return;
        }

        this.sqliteDB.db.exec(createTableSql);
    }

    async selectAllWebList() {
        const selectSysWeb = await this.sqliteDB.db.prepare(`SELECT * FROM ${sysWebTable}`);
        return selectSysWeb.all();
    }

    async selectWebList(data) {
        const { category } = data;
        const selectSysWeb = this.sqliteDB.db.prepare(`SELECT * FROM ${sysWebTable} WHERE category = @category`);
        return selectSysWeb.all({
            category: category
        });
    }

    async addWeb(data) {
        const insert = this.sqliteDB.db.prepare(`INSERT INTO ${sysWebTable} (name, url, category, showType, sort) VALUES (@name, @url, @category, @showType, @sort)`);
        insert.run(data);
        return true;
    }

    async selectNovelList() {
        const selectSysNovel = this.sqliteDB.db.prepare(`SELECT * FROM ${sysNovelTable}`);
        return selectSysNovel.all();
    }

    async addNovel(data) {
        this.sqliteDB.db.exec('BEGIN');
        try {
            const insert = this.sqliteDB.db.prepare(`INSERT INTO ${sysNovelTable} (name, contentType, progress) VALUES (@name, @contentType, @progress)`);
            const { lastInsertRowid } = await insert.run(data);
            await this.addNovelDetail({
                novelId: lastInsertRowid,
                content: data.content
            });
            this.sqliteDB.db.exec('COMMIT');
        } catch (e) {
            this.sqliteDB.db.exec('ROLLBACK');
        }

    }

    async addNovelDetail(data) {
        const insert = this.sqliteDB.db.prepare(`INSERT INTO ${sysNovelDetailTable} (novelId, content) VALUES (@novelId, @content)`);
        insert.run(data);
        return true;
    }

    async getNovelDetail(novelId) {
        const selectSysNovelDetail = this.sqliteDB.db.prepare(`SELECT * FROM ${sysNovelDetailTable} WHERE novelId = @novelId`);
        return selectSysNovelDetail.all({
            novelId
        });
    }

    async selectAllConfigList() {
        const selectSysConfig = await this.sqliteDB.db.prepare(`SELECT * FROM ${sysConfigTable}`);
        return selectSysConfig.all();
    }

    async addConfig(data) {
        console.log('addConfig', data);
        const insert = await this.sqliteDB.db.prepare(`INSERT INTO ${sysConfigTable} (key, value) VALUES (@key, @value`);
        insert.run(data);
        return true;
    }
}

module.exports = StorageService;
