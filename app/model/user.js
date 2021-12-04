'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user_info', {
    // 
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user: STRING(30),
    password: INTEGER,
    updated_at: DATE,
    updated_at: DATE,
    name:STRING
  },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      query: { raw:true }
    });

  return User;
};