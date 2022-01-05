const Controller = require('egg').Controller;
const sequelize = require("sequelize")

class ResourceController extends Controller {
    async list() {
        const ctx = this.ctx
        const query = ctx.query
        const type_id = query.type_id;
        let where = {}
        if (!type_id) {
            
        }else if (type_id.split(",").length === 1 && type_id) {
            where = {
                [sequelize.Op.and]: [
                    sequelize.where(sequelize.fn("FIND_IN_SET", type_id, sequelize.col('type_id')), '>', 0)
                ]
            }
        } else if (type_id.split(",").length > 1) {
            where = {
                [sequelize.Op.and]: [
                    { type_id: type_id }
                ]
            }
        }
        const result = await ctx.model.Resource.findAll(
            {
                where: where
            }
        )
        if (result) {
            ctx.body = this.app.middleware.returnsFormat.succeed(result)
        } else {
            ctx.body = this.app.middleware.returnsFormat.error({ msg: "出错了" })
        }
    }

    async add() {
        const ctx = this.ctx
        const {
            name,
            url,
            down_url,
            down_no,
            cover,
            intro,
            type_id } = ctx.request.body
        const created_at = new Date()
        const updated_at = new Date()
        const result = ctx.model.Resource.create({
            name,
            url,
            down_url,
            down_no,
            cover,
            intro,
            type_id, created_at, updated_at
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
            name,
            url,
            down_url,
            down_no,
            cover,
            intro,
            type_id,
            created_at,
        } = ctx.request.body;
        const updated_at = new Date()
        if (!id) return ctx.body = app.middleware.returnsFormat.error("请传id")
        const result = ctx.model.Resource.update({
            name,
            url,
            down_url,
            down_no,
            cover,
            intro,
            type_id, created_at, updated_at
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
        const body = ctx.model.Resource.destroy({where:{id:{[sequelize.Op.in]:ids}}})
        if (body) {
            ctx.status = 200
            ctx.body = await app.middleware.returnsFormat.succeed(body)
        } else {
            ctx.body = await app.middleware.returnsFormat.error({ msg: "出错了" })
        }

    }
}

module.exports = ResourceController;