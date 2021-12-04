const fs = require("fs")
const pump = require("pump")
// 保存头像/封面
const Controller = require('egg').Controller;
class UploadController extends Controller {
  async saveMdImage() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await this.service.tools.getUploadFile(stream.filename,"md");
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      });
    }

    if (Object.keys(files).length > 0) {
      ctx.body = {
        success: 1,
        message: "上传成功",
        url: files['mdImage']
      }
    } else {
      ctx.body = {
        success: 0,
        message: '图片上传失败',
      }
    }
  }

  async saveCoverImage() {
    const { ctx } = this;
    // console.log("ctx.getFileStream()",ctx.getFileStream());
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    let fieldname="img"
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      fieldname= stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await this.service.tools.getUploadFile(stream.filename,fieldname);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      });
    }

    if (Object.keys(files).length > 0) {
      ctx.body = {
        success: 1,
        message: "上传成功",
        url: files[fieldname]
      }
    } else {
      ctx.body = {
        success: 0,
        message: '图片上传失败',
      }
    }
  }
}

module.exports = UploadController
