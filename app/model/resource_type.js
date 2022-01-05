'use strict';

module.exports=app=>{
    const { STRING, INTEGER, DATE, } =app.Sequelize
    const ResourceType=app.model.define("resource_type_info",{
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        type:STRING,
        created_at:DATE,
        updated_at:DATE
    },{
        freezeTableName:true
    })

    return ResourceType
}