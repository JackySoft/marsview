const connection = require('../sql');
class UserService {
  // 查询总条数
  async listCount(project_id, user_name) {
    const statement =
      "SELECT COUNT(`id`) total FROM project_user WHERE project_id = ? and (user_name LIKE COALESCE(CONCAT('%',?,'%'), user_name) OR ? IS NULL);";
    const [result] = await connection.execute(statement, [project_id, user_name || null, user_name || null]);
    return result[0];
  }

  // 查询列表
  async list(project_id, user_name, pageNum = 1, pageSize = 10) {
    const offset = (+pageNum - 1) * pageSize + '';
    const limit = pageSize;
    const statement = `SELECT * FROM project_user WHERE project_id = ? and (user_name LIKE COALESCE(CONCAT('%',?,'%'), user_name) OR ? IS NULL) ORDER BY id DESC LIMIT ${offset},${limit};`;
    const [result] = await connection.execute(statement, [project_id, user_name || null, user_name || null]);
    return result;
  }

  async createUser({ user_id, user_name, project_id, system_role, role_id }) {
    const statement = 'INSERT INTO project_user (user_id, user_name, project_id, system_role, role_id) VALUES (?, ?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [user_id, user_name, project_id, system_role, role_id]);
    return result;
  }

  async deleteUser(id) {
    const statement = 'DELETE FROM project_user WHERE id = ?;';
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async updateUser({ id, system_role, role_id = '' }) {
    const statement = 'UPDATE project_user SET system_role = ?, role_id = ? WHERE id = ?;';
    const [result] = await connection.execute(statement, [system_role, role_id, id]);
    return result;
  }

  // 查询详情
  async detail(id) {
    const statement = `SELECT * FROM project_user WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result[0];
  }

  // 根据项目ID和账号查询用户角色信息
  async getUserRole(userId, projectId) {
    const statement = `SELECT * FROM project_user WHERE user_id = ? and project_id = ?;`;
    const [result] = await connection.execute(statement, [userId, projectId]);
    return result[0];
  }
}

module.exports = new UserService();
