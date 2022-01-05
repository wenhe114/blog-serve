const Controller = require('egg').Controller;
const sequelize = require("sequelize")

class ResourceController extends Controller {
    async list() {
        const ctx = this.ctx
        const result = await ctx.model.ResourceType.findAll()
        if (result) {
            ctx.body = this.app.middleware.returnsFormat.succeed(result)
        } else {
            ctx.body = this.app.middleware.returnsFormat.error({ msg: "出错了" })
        }
    }

    async add() {
        const ctx = this.ctx
        const {
            type} = ctx.request.body
        const created_at = new Date()
        const updated_at = new Date()
        const result = ctx.model.ResourceType.create({
            type, created_at, updated_at
        })
        if (result) {
            ctx.body = this.app.middleware.returnsFormat.succeed(result)
        } else {
            ctx.body = this.app.middleware.returnsFormat.error({ msg: "出错了" })
        }
    }

    async update() {
        const ctx = this.ctx;
        const app = this.app
        const {
            id,
            type,
            created_at,
        } = ctx.request.body;
        const updated_at = new Date()
        if (!id) return ctx.body = app.middleware.returnsFormat.error("请传id")
        const result = ctx.model.ResourceType.update({
            type, created_at, updated_at
        }, { where: { id: id } })
        if (result) {
            ctx.body = app.middleware.returnsFormat.succeed(result)
        } else {
            ctx.body = app.middleware.returnsFormat.error({ msg: "出错了" })
        }
    }
     // 删除
     async delete() {
        const ctx = this.ctx
        const app = this.app
        const id = ctx.params.id
        const ids=id.split(",")
        const body = ctx.model.ResourceType.destroy({where:{id:{[sequelize.Op.in]:ids}}})
        if (body) {
            ctx.status = 200
            ctx.body = await app.middleware.returnsFormat.succeed(body)
        } else {
            ctx.body = await app.middleware.returnsFormat.error({ msg: "出错了" })
        }

    }
}

module.exports = ResourceController;