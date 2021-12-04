module.exports = options => {
    return async function jwt(ctx, next) {
        console.log(ctx.request.header);
      const token = ctx.request.header.unauthorizederror;
      let decode;
      if (token) {
        try {
          // 解码token
          decode = ctx.app.jwt.verify(token, options.secret);
          await next();
          console.log("decode",decode);
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            message: error.message,
          };
          return;
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          message: '没有token',
        };
        return;
      }
    };
  };