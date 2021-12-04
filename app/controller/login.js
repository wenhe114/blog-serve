'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
    async login() {
        const { ctx, app } = this;
        //获取用户端传递过来的参数
        const body = ctx.request.body;
        // 进行验证 data 数据 登录是否成功
        // .........
        //成功过后进行一下操作
        const data = await ctx.model.User.findOne({
            where: {
                user: body.user,
                password: body.password
            }
        })
        if (data) {
            //生成 token 的方式
            const token = app.jwt.sign({

                data: data, //需要存储的 token 数据
                //......

            }, app.config.jwt.secret, { expiresIn: "600m" });
            // 生成的token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NjAzNDY5MDN9.B95GqH-fdRpyZIE5g_T0l8RgzNyWOyXepkLiynWqrJg

            // 返回 token 到前端
            ctx.body = app.middleware.returnsFormat.succeed({
                token,
                data
            });
        }else{
            ctx.body = app.middleware.returnsFormat.error({
                data:"账号或者密码错误"
            });
        }

    }
    //访问admin数据时进行验证token，并且解析 token 的数据
    async index() {

        const { ctx, app } = this;

        console.log(ctx.state.username);
        /* 
        * 打印内容为：{ username : 'admin', iat: 1560346903 }
        * iat 为过期时间，可以单独写中间件验证，这里不做细究
        * 除了 iat 之后，其余的为当时存储的数据
        **/

        ctx.body = { code: 0, msg: '验证成功' };
    }
}

module.exports = LoginController