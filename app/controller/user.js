const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    // console.log("queryqueryqueryquery",query);
   const data=await ctx.model.User.findAll()
   if (data) {
    ctx.body =this.app.middleware.returnsFormat.succeed(data)
   }else{
    ctx.body =this.app.middleware.returnsFormat.error(data)
   }
    
  }

  async detailId() {
    const ctx = this.ctx;
    const data=await ctx.model.User.findByPk(toInt(ctx.params.id))
    if (data) {
      ctx.body = this.app.middleware.returnsFormat.succeed(data);
    }else{
      ctx.body = this.app.middleware.returnsFormat.error(data);
    }
    
  }

  async create() {
    const ctx = this.ctx;
    const { user,password,created_at,name, updated_at } = ctx.request.body;

    const data = await ctx.model.User.create({ user,password,created_at,name, updated_at });
    ctx.status = 201;
    if (data) {
      ctx.body = this.app.middleware.returnsFormat.succeed(data);
    }else{
      ctx.body = this.app.middleware.returnsFormat.error({msg:"添加失败"});
    }
  }

  async update() {
    const ctx = this.ctx;
    const { user,password,created_at,name, updated_at,id } = ctx.request.body;
    const data= await user.update({ user,password,created_at,name, updated_at,id },{where:{id:id}});
    if (data) {
      ctx.body=this.app.middleware.returnsFormat.succeed(data);
    }else{
      ctx.body=this.app.middleware.returnsFormat.error({msg:"更新失败"});
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
   
    const data= await user.destroy({where:{id:id}});
    if (data) {
      ctx.body=this.app.middleware.returnsFormat.succeed(data);
    }else{
      ctx.body=this.app.middleware.returnsFormat.error({msg:"删除失败"});
    }
  }
}

module.exports = UserController;