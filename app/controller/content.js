'use strict';
const { Op } = require("sequelize")
const Sequelize = require("sequelize")
const Controller = require('egg').Controller;

class ContentController extends Controller {
    async index() {
        const ctx = this.ctx;
        const app = this.app
        const currentPage = parseInt(ctx.query.currentPage) || 1
        const pageSize = parseInt(ctx.query.pageSize) || 10
        const MenuData = await this.service.meun.list()
        const menu = await this.service.meun.menu()
        const contentData = await ctx.model.Content.findAndCountAll({
            where: ctx.params.menuId ? {
                type: ctx.params.menuId
            } : {},
            include: {
                model: app.model.Menu
            },
            offset: (currentPage - 1) * pageSize,
            limit: pageSize
        })
        let data = {
            MenuData: MenuData,
            menu,
            contentData: contentData.rows,
            id: ctx.params.menuId
            // contentData:{
            //     ...contentData,
            //     ...contentData.menu_info
            // }
        }
        // ctx.body=await data
        console.log(menu);
        await ctx.render("content/content.tpl", data)
    }

    async detailId() {

        const ctx = this.ctx;
        // const MenuData = await this.service.meun.list()
        const id = ctx.params.id
        // const menu=await this.service.meun.menu()
        const contentData = await ctx.model.Content.findOne({
            where: {
                id: id
            }
        })
        // const data = {
        //     contentData,
        //     id,
        //     MenuData,
        //     menu
        // }
        if (contentData) {
            ctx.body = this.app.middleware.returnsFormat.succeed(contentData)
        } else {
            ctx.body = this.app.middleware.returnsFormat.error({ msg: "出错了" })
        }

        // await ctx.render("contentDetail/contentDetail.tpl", data)
    }

    // 添加
    async add() {
        const ctx = this.ctx;
        const app = this.app
        const body = ctx.request.body;
        const name = body.name
        const content = body.content
        const content_md = body.content_md
        const img = body.img
        const tag = body.tag
        const intro = body.intro
        const read_num = 0
        const praise_num = 0
        const remark_num = 0
        const type = body.type
        const author = body.author
        const created_at = new Date()
        const updated_at = new Date()
        const contentStatus = await ctx.model.Content.create({ name, content, content_md, img, tag, intro, read_num, praise_num, remark_num, type, author, created_at, updated_at })
        ctx.status = 200
        if (contentStatus) {
            ctx.body = app.middleware.returnsFormat.succeed(contentStatus)
        } else {
            ctx.body = app.middleware.returnsFormat.error({ msg: "出错了" })
        }

    }

    // 内容列表
    async contentList() {
        const ctx = this.ctx;

        const app = this.app
        const currentPage = parseInt(ctx.query.currentPage) || 1
        const pageSize = parseInt(ctx.query.pageSize) || 10
        // const MenuData=await this.service.meun.list()
        const params = []

        if (ctx.query.id) {
            params.push({ type: ctx.query.id })
        }
        if (ctx.query.name) {
            // params.push({
            //     name: {
            //         [Op.like]: '%' + ctx.query.name + '%'
            //     }
            // })
            params.push({
                [Op.or]: {
                    name: {
                        [Op.like]: '%' + ctx.query.name + '%'
                    },
                    content: {
                        [Op.like]: '%' + ctx.query.name + '%'
                    }
                }

            })
        }
        // if (ctx.query.content) {
        //     params.push({content:{
        //         [Op.like]:'%'+ctx.query.content+'%'
        //     }})
        // }
        const where = params.length === 0 ? {} : { [Op.and]: params }
        const contentData = await ctx.model.Content.findAndCountAll({
            where: where,
            order: [['updated_at', 'desc']],
            include: {
                model: app.model.Menu
            },
            offset: (currentPage - 1) * pageSize,
            limit: pageSize,
            raw: true
        })
        let data = {
            page: {
                total: contentData.count,
                currentPage: currentPage,
                pageSize: pageSize
            },
            list: []
        }

        if (contentData) {
            contentData.rows.forEach((item) => {
                data.list.push({
                    id: item.id,
                    name: item.name,
                    content: item.content,
                    content_md: item.content_md,
                    img: item.img,
                    tag: item.tag,
                    intro: item.intro,
                    read_num: item.read_num,
                    praise_num: item.praise_num,
                    remark_num: item.remark_num,
                    type: item.type,
                    author: item.author,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    menu_info: {
                        id: item["menu_info.id"],
                        meun_title: item["menu_info.meun_title"],
                        level: item["menu_info.level"],
                        icon: item["menu_info.icon"],
                        url: item["menu_info.url"],
                        parent_id: item["menu_info.parent_id"],
                        sort: item["menu_info.sort"],
                    }
                })
            });
            ctx.body = await app.middleware.returnsFormat.succeed(data)
        } else {
            ctx.body = await app.middleware.returnsFormat.error({ msg: "出错了" })
        }

    }

    // 更新
    async update() {
        const ctx = this.ctx;
        const app = this.app
        const body = ctx.request.body;
        const id = body.id
        if (!id) return ctx.body = app.middleware.returnsFormat.error("请传id")
        const name = body.name
        const content = body.content
        const content_md = body.content_md
        const img = body.img
        const tag = body.tag
        const intro = body.intro
        const type = body.type
        const author = body.author
        const read_num = body.read_num
        const praise_num = body.praise_num
        const remark_num = body.remark_num
        const created_at = body.created_at
        const updated_at = new Date()
        const data = await ctx.model.Content.update({ name, content, content_md, img, tag, intro, read_num, praise_num, remark_num, type, author, created_at, updated_at }, { where: { id: id } })
        if (data) {
            ctx.status = 200
            ctx.body = app.middleware.returnsFormat.succeed(body)
        } else {
            ctx.body = app.middleware.returnsFormat.error({ msg: "出错了" })
        }
    }
    // 删除
    async delete() {
        const ctx = this.ctx
        const app = this.app
        const id = ctx.params.id
        const body = ctx.model.Content.destroy({ where: { id: id } })
        if (body) {
            ctx.status = 200
            ctx.body = await app.middleware.returnsFormat.succeed(body)
        } else {
            ctx.body = await app.middleware.returnsFormat.error({ msg: "出错了" })
        }

    }

    // 更新阅读量
    async updateReadNum() {
        const ctx = this.ctx
        const app = this.app
        const body = ctx.request.body;
        const id = body.id
        console.log("body", body);
        if (!id) return ctx.body = app.middleware.returnsFormat.error("请传id")
        const read_num = body.read_num
        const data = await ctx.model.Content.update({ read_num }, { where: { id: id } })
        if (data) {
            ctx.status = 200
            ctx.body = app.middleware.returnsFormat.succeed(body)
        } else {
            ctx.body = app.middleware.returnsFormat.error({ msg: "出错了" })
        }

    }

    // 更新阅读量
    async updatePraiseNum() {
        const ctx = this.ctx
        const app = this.app
        const body = ctx.request.body;
        const id = body.id
        if (!id) return ctx.body = app.middleware.returnsFormat.error("请传id")
        const praise_num = body.praise_num
        const data = await ctx.model.Content.update({ praise_num }, { where: { id: id } })
        if (data) {
            ctx.status = 200
            ctx.body = app.middleware.returnsFormat.succeed(data)
        } else {
            ctx.body = app.middleware.returnsFormat.error({ msg: "出错了" })
        }

    }

    // 分析内容type对应数量
    async analysis() {
        const ctx = this.ctx
        const app = this.app
        const data = await ctx.model.Content.findAll({
            where: {},

            group: "content_info.type",
            // model:app.model.Menu,
            include: {
                attributes: [[Sequelize.col('id'), 'id'], [Sequelize.col('meun_title'), 'meun_title'], [Sequelize.col('sort'), 'sort']],
                model: app.model.Menu
            },
            raw: true,
            attributes: [
                // [Sequelize.col('content_info.id'), 'id'],
                // [Sequelize.col('content_info.name'), 'name'],
                [Sequelize.fn('COUNT', '*'), 'count']
            ]
        })
        if (data) {
            const result = []
            data.forEach((item) => {
                result.push({
                    id: item["menu_info.id"],
                    menu_title: item["menu_info.meun_title"],
                    sort: item["menu_info.sort"],
                    count: item.count
                })
            })
            ctx.body = await app.middleware.returnsFormat.succeed(result)
        } else {
            ctx.body = await app.middleware.returnsFormat.error({ msg: "出错了" })
        }

    }

    async sitemap() {
        const ctx = this.ctx
        const result = await ctx.model.Content.findAll({});
        let data = []
        const now = new Date();
        now.setHours(now.getHours(), now.getMinutes() - now.getTimezoneOffset());
        for (let i = 0; i < result.length; i++) {
            let temp = {
                url: "/content/detail?content_id="+result[i].id,  
                changefreq: "daily",
                lastmod: now.toISOString(),
                id:result[i].id,
                name:result[i].name,
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

module.exports = ContentController