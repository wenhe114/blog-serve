'use strict';

module.exports=app=>{
    const { STRING, INTEGER, DATE, } =app.Sequelize
    const Menu=app.model.define("menu_info",{
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        meun_title:STRING,
        level:INTEGER,
        icon:STRING,
        url:STRING,
        parent_id:INTEGER,
        sort:INTEGER,
        created_at:DATE,
        updated_at:DATE
    },{
        freezeTableName:true
    })

    Menu.associate = function() {
        // app.model.Menu.belongsTo(app.model.Content, { foreignKey: 'type', targetKey: 'id' });
        app.model.Menu.hasOne(app.model.Content, { foreignKey: 'id', targetKey:"type"});
        // app.model.Menu.hasMany(app.model.Family, { foreignKey: 'type', targetKey: 'id' });
    }

    return Menu
}