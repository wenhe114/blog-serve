const Service = require('egg').Service;

class MenuService extends Service {
    async list() {
        const ctx = this.ctx
        const data = ctx.model.Menu.findAll({
            where: {
                parent_id: 0
            },
            order: [['sort', 'asc']],
        })
        const dataList = await data
        
        let MenuData=[]
        const allData= dataList.map(async (item,index)=>{
            MenuData.push({
                ...item.dataValues
            })
            MenuData[index].children=await ctx.model.Menu.findAll({
                where:{
                    parent_id:item.id
                },
                order:[['sort','asc']],
            })
        })
        console.log("await allData121212");
        await Promise.all(allData)
        // ctx.body = await MenuData
        return MenuData
    }

    async menu(){
        const ctx = this.ctx
        const menu= ctx.model.Menu.findOne({
            where:{
                id:ctx.params.id
            }
        })
        return await menu
    }
    async add() {
        const ctx = this.ctx
        const app = this.app
        const data = ctx.request.body
        const meun_title = data.meun_title
        const level = data.level
        const icon = data.icon
        const url = data.url
        const parent_id = data.parent_id
        const sort = data.sort
        const created_at = new Date()
        const updated_at = new Date()
        const menu = await ctx.model.Menu.create({ meun_title, level, icon, url, parent_id, sort, created_at, updated_at })
        ctx.status = 201
        ctx.body = app.middleware.returnsFormat.succeed(menu)
    }
}

module.exports = MenuService