/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1634823260409_4998';

  // add your middleware config here
  config.middleware = [];

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: "3306",
    database: 'blog',
    username: "root",
    password: "root",
    charset: "utf8",
    timezone: "+08:00",
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          // 返回正确得时间
          return field.string();
        }
        return next();
      }
    },
    query: { raw:true } 
  };

  // image保存路径
  config.uploadDir = 'app/public/upload';
  config.jwt = {
    secret: "ylw"//自定义 token 的加密条件字符串
  };
  
  config.security={
    csrf:{
      enable:false,
      ignoreJSON: true
    },
    // domainWhiteList: ['http://localhost:8080'],//允许访问接口的白名单
  }
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
