const errorHandler = (error, ctx) => {
  console.log("[status]", ctx.status);
  console.log("[message]", error.message);
  ctx.status = 500;
  ctx.message = error.message || "";
  ctx.body = {
    code: 500,
    data: "",
    message: ctx.message,
  };
};

module.exports = errorHandler;
