'use strict';

module.exports=app=>{
    const { STRING, INTEGER, DATE, } =app.Sequelize
    const Resource=app.model.define("resource_info",{
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name:STRING,
        url:STRING,
        down_url:STRING,
        down_no:STRING,
        cover:STRING,
        intro:STRING,
        type_id:STRING,
        created_at:DATE,
        updated_at:DATE
    },{
        freezeTableName:true
    })

    return Resource
}