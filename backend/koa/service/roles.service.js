const connection = require('../sql');

class RoleService {
  // 查询总条数
  async listCount(project_id, name) {
    const statement = "SELECT COUNT(`id`) total FROM roles WHERE project_id = ? and (name LIKE COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) ;";
    const [result] = await connection.execute(statement, [project_id, name || null, name || null]);
    return result[0];
  }

  async list(project_id, name, pageNum = 1, pageSize = 10) {
    const offset = (+pageNum - 1) * pageSize + '';
    const limit = pageSize;
    const statement = `SELECT * FROM roles WHERE project_id = ? and  (name LIKE COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) ORDER BY updated_at DESC LIMIT ${offset},${limit};`;
    const [result] = await connection.execute(statement, [project_id, name || null, name || null]);
    return result;
  }

  async listAll(project_id) {
    const statement = 'SELECT * FROM roles WHERE project_id = ?;';
    const [result] = await connection.execute(statement, [project_id]);
    return result;
  }

  async create(project_id, name, remark, user_id, user_name) {
    const statement = 'INSERT INTO roles (project_id, name, remark, user_id, user_name) VALUES (?, ?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [project_id, name, remark, user_id, user_name]);
    return result;
  }

  async delete(id, project_id) {
    let result = [];
    const statement = 'DELETE FROM roles WHERE id = ? && project_id = ?';
    [result] = await connection.execute(statement, [id, project_id]);

    return result;
  }

  async update(id, project_id, name = '', remark = '') {
    let result = [];
    const statement = 'UPDATE roles SET name = ?, remark = ? WHERE id = ? && project_id = ?';
    [result] = await connection.execute(statement, [name, remark, id, project_id]);
    return result;
  }

  async updateLimits(id, project_id, checked = '', half_checked = '') {
    let result = [];
    const statement = 'UPDATE roles SET checked = ?, half_checked = ? WHERE id = ? && project_id = ?';
    [result] = await connection.execute(statement, [checked, half_checked, id, project_id]);
    return result;
  }

  // 根据角色ID查询权限ID
  async getRoleInfo(id) {
    const statement = 'SELECT * FROM roles WHERE id = ?';
    const [result] = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new RoleService();
