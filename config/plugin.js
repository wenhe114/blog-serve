'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  nunjucks :{
    enable: true,
    package: 'egg-view-nunjucks'
  },
  sequelize :{
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
