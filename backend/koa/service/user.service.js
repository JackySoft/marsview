const connection = require('../sql');

class UserService {
  // 查询总条数
  async findUser(userName, userPwd) {
    const statement = 'SELECT id, user_name FROM users WHERE user_name = ? and user_pwd = ? ;';
    const [result] = await connection.execute(statement, [userName, userPwd]);
    return result[0];
  }

  // 用户注册
  async create(user_name, user_pwd) {
    const statement = 'INSERT INTO users (user_name, user_pwd) VALUES (?, ?);';
    const [result] = await connection.execute(statement, [user_name, user_pwd]);
    return result;
  }
  // 用户查找
  async search(user_name) {
    const statement = 'select id, user_name from users where user_name = ?;';
    const [result] = await connection.execute(statement, [user_name]);
    return result[0];
  }
}
module.exports = new UserService();
