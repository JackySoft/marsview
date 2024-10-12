const fs = require('node:fs');
const path = require('node:path');

/**
 * 路由自动注册
 */
const routerInstaller = (app) => {
  const exclude = [];
  const routerdir = path.resolve(__dirname, '../router');
  const routers = fs.readdirSync(path.resolve(routerdir), {
    encoding: 'utf-8',
  });
  const include = routers.filter((i) => exclude.indexOf(i) === -1);
  include.forEach((i) => {
    app.use(require(`${routerdir}/${i}`).routes());
    app.use(require(`${routerdir}/${i}`).allowedMethods());
  });
};

module.exports = {
  routerInstaller,
};
