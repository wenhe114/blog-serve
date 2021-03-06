'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller  } = app;
  const jwt= app.middleware.jwt(app.config.jwt)
  router.get('/', controller.index.index);
  router.get('/news', controller.news.list);
  router.get('/users', controller.user.index);
  router.get('/content/:menuId', controller.content.index);
  // 上传图片/头像/封面
  router.post('/upload/mdimg', controller.upload.saveMdImage);
  router.post('/upload/cover', controller.upload.saveCoverImage);

  // 后端admin
  router.post("/login",controller.login.login)
  router.get("/admin",jwt,controller.login.index)
  // 查看菜单列表
  router.get("/menu/list",controller.meun.list)
  router.post("/menu/add",controller.meun.add)
  router.put("/menu/update",controller.meun.update)
  router.delete("/menu/delete/:id",controller.meun.delete)
  router.get("/menu/sitemap",controller.meun.sitemap)

  // 内容content接口
  router.post("/content/add",controller.content.add)
  router.get("/contents/list",controller.content.contentList)
  router.get("/contents/analysis",controller.content.analysis)
  router.get("/content/detail/:id",controller.content.detailId)
  router.put("/content/update",controller.content.update)
  router.delete("/content/delete/:id",controller.content.delete)
  router.put("/content/update/readNum",controller.content.updateReadNum)
  router.put("/content/update/praiseNum",controller.content.updatePraiseNum)
  router.get("/contents/sitemap",controller.content.sitemap)
  

  // 关于我
  router.get("/about",controller.about.look)
  router.put("/about/update",controller.about.update)

  // icon
  router.get("/icon/list",controller.icon.list)
  router.post("/icon/add",controller.icon.add)
  router.put("/icon/update",controller.icon.update)
  router.delete("/icon/delete/:id",controller.icon.delete)

  // 资源
  router.get("/resource/list",controller.resource.list)
  router.post("/resource/add",controller.resource.add)
  router.put("/resource/update",controller.resource.update)
  router.delete("/resource/delete/:id",controller.resource.delete)

  // 资源分类
  router.get("/resourceType/list",controller.resourceType.list)
  router.post("/resourceType/add",controller.resourceType.add)
  router.put("/resourceType/update",controller.resourceType.update)
  router.delete("/resourceType/delete/:id",controller.resourceType.delete)
};
