'use strict';
const { Op } = require("sequelize")
const Controller = require('egg').Controller;

class AboutController extends Controller {
    async look(){
        const ctx = this.ctx;
        const data=await ctx.model.About.findOne()
        if (data) {
            ctx.body=this.app.middleware.returnsFormat.succeed(data)
        }else{
            ctx.body=this.app.middleware.returnsFormat.error({msg:"出错了"})
        }
    }

    // 更新
    async update(){
        const ctx = this.ctx;
        const {id,name,age,intro,job,beian_num,mail,github,skill,photo,created_at,updated_at,qq,wechat} =ctx.request.body
        
        const data= await ctx.model.About.update({ name,age,intro,job,beian_num,mail,github,skill,photo,qq,wechat,created_at,updated_at},{where:{id:id}})
        if (data) {
            ctx.body=this.app.middleware.returnsFormat.succeed(data)
        }else{
            ctx.body= this.app.middleware.returnsFormat.error({msg:"出错了"})
        }
    }
}

module.exports = AboutController