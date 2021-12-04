'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const MenuData=await this.service.meun.list()
    await ctx.render("/index/index.tpl",{
      MenuData
    })
  }
}

module.exports = HomeController;
