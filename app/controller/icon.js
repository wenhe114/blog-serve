'use strict'
const { Op } = require("sequelize")
const Controller = require('egg').Controller;

class IconController extends Controller {
    async add(){
        const ctx = this.ctx;
        const app=this.app
        const {name,icon} =ctx.request.body
        const created_at = new Date()
        const updated_at = new Date()
        const result=await ctx.model.Icon.create({name,icon,created_at,updated_at})
        if (result) {
            ctx.status = 201
            ctx.body = app.middleware.returnsFormat.succeed(result)
        }else{
            ctx.body=app.middleware.returnsFormat.error({msg:"出错了"})
        }
    }
    async update(){
        const ctx = this.ctx;
        const app=this.app
        const {id,name,icon,created_at} =ctx.request.body
        if (!id) {
            ctx.body=app.middleware.returnsFormat.error({msg:"缺少必要参数了"})
        }
        // const created_at = new Date()
        const updated_at = new Date()
        const result=await ctx.model.Icon.update({name,icon,created_at,updated_at},{where:{id:id}})
        if (result) {
            ctx.status = 201
            ctx.body = app.middleware.returnsFormat.succeed(result)
        }else{
            ctx.body=app.middleware.returnsFormat.error({msg:"出错了"})
        }
    }
    async delete(){
        const ctx=this.ctx
        const app=this.app
        const id=ctx.params.id
        const ids=id.split(",")
        console.log("ids",ids);
        if (!id) {
            ctx.body=app.middleware.returnsFormat.error({msg:"缺少必要参数了"})
        }
        const body=ctx.model.Icon.destroy({where:{id:{[Op.in]:ids}}})
        if (body) {
            ctx.status = 200
            ctx.body =await app.middleware.returnsFormat.succeed(body)
        }else{
            ctx.body=app.middleware.returnsFormat.error({msg:"出错了"})
        }
       
    }

    async list(){
        const ctx=this.ctx
        const app=this.app
        const result= await ctx.model.Icon.findAll()
        if (result) {
            ctx.status = 200
            ctx.body =await app.middleware.returnsFormat.succeed(result)
        }else{
            ctx.body=app.middleware.returnsFormat.error({msg:"出错了"})
        }
    }
}

module.exports = IconController