'use strict';

module.exports=app=>{
    const { STRING, INTEGER, DATE, } =app.Sequelize
    const About=app.model.define("about_info",{
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name:STRING,
        age:INTEGER,
        intro:STRING,
        job:STRING,
        beian_num:STRING,
        mail:STRING,
        github:STRING,
        skill:STRING,
        photo:STRING,
        created_at:DATE,
        updated_at:DATE,
        qq:STRING,
        wechat:STRING,
        about_page:STRING
    },{
        freezeTableName:true
    })
    return About
}