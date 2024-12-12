'use strict';

const CoreWindow = require('ee-core/electron/window');
const { Service } = require('ee-core');
const { nativeTheme } = require('electron/main')
const Storage = require('ee-core/storage');
const _ = require('lodash');

/**
 * 用户服务（service层为单例）
 * @class
 */
class UserService extends Service {

}

UserService.toString = () => '[class UserService]';
module.exports = UserService;
