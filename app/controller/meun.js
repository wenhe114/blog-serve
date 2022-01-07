const Controller = require('egg').Controller;
class MenuController extends Controller {
    async list() {
        const ctx = this.ctx
        const data = ctx.model.Menu.findAll({
            where: {
                parent_id: 0
            },
            order: [['sort', 'asc']],
        })
        const dataList = await data
        let MenuData = []
        const allData = dataList.map(async (item, index) => {
            MenuData.push({
                ...item
            })
            MenuData[index].children = await ctx.model.Menu.findAll({
                where: {
                    parent_id: item.id
                },
                order: [['sort', 'asc']],
            })
        })
        await Promise.all(allData)
        ctx.body = this.app.middleware.returnsFormat.succeed(await MenuData)
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
    async update() {
        const ctx = this.ctx;
        const app = this.app
        const body = ctx.request.body;
        const id = body.id
        if (!id) return ctx.body = app.middleware.returnsFormat.error("请传id")
        const meun_title = body.meun_title
        const level = body.level
        const icon = body.icon
        const url = body.url
        const parent_id = body.parent_id
        const sort = body.sort
        const created_at = body.created_at
        const updated_at = new Date()
        const menu = await ctx.model.Menu.update({ meun_title, level, icon, url, parent_id, sort, created_at, updated_at },{where:{id:id}})
        ctx.status = 201
        ctx.body = app.middleware.returnsFormat.succeed(body)
    }

    async delete(){
        const ctx=this.ctx
        const app=this.app
        const id=ctx.params.id
        const body=ctx.model.Menu.destroy({where:{id:id}})
        console.log(body);
        ctx.status = 200
        ctx.body =await app.middleware.returnsFormat.succeed(body)
    }

    async sitemap() {
        const ctx = this.ctx
        const result = await ctx.model.Menu.findAll({});
        const now = new Date();
        now.setHours(now.getHours(), now.getMinutes() - now.getTimezoneOffset());
        let data = []
        for (let i = 0; i < result.length; i++) {
            let temp = {
                url: "/content?id="+result[i].id,  
                changefreq: "daily",
                lastmod: now.toISOString(),
                name:result[i].meun_title,
                created_at:result[i].created_at
            }
            data.push(temp)
        }
        if (result) {
            ctx.body = this.app.middleware.returnsFormat.succeed(data)
        } else {
            ctx.body = this.app.middleware.returnsFormat.error({ msg: "出错了" })
        }
    }
}

module.exports = MenuController