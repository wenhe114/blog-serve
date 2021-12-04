'use strict';

module.exports=app=>{
    const { STRING, INTEGER, DATE, } =app.Sequelize
    const Content=app.model.define("content_info",{
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name:STRING,
        content:STRING,
        content_md:STRING,
        img:STRING,
        tag:STRING,
        intro:STRING,
        read_num:INTEGER,
        praise_num:INTEGER,
        remark_num:INTEGER,
        type:INTEGER,
        author:STRING,
        created_at:DATE,
        updated_at:DATE
    },{
        freezeTableName:true
    })
    
    Content.associate = function() {
        app.model.Content.belongsTo(app.model.Menu, { foreignKey: 'type', targetKey: 'id' })
    }

    return Content
}