const app = require('./app');
const { SERVER_HOST, SERVER_PORT } = require('./config');

app.listen(SERVER_PORT, () => {
  console.log(`Marsview服务已启动 ${SERVER_HOST}:${SERVER_PORT}`);
});
