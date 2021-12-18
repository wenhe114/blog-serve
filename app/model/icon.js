'use strict';

module.exports=app=>{
    const { STRING, INTEGER, DATE, } =app.Sequelize
    const Icon=app.model.define("icon_info",{
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name:STRING,
        icon:STRING,
        created_at:DATE,
        updated_at:DATE
    },{
        freezeTableName:true
    })
    return Icon
}