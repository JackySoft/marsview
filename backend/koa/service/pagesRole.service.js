const connection = require('../sql');

class PagesRoleService {
  async getPagesRoleList(page_id) {
    const statement = 'SELECT id, page_id, role, user_id, user_name FROM pages_role WHERE page_id = ?;';
    const [result] = await connection.execute(statement, [page_id]);
    return result;
  }

  async create(type, page_id, role, user_id, user_name) {
    const statement = 'INSERT INTO pages_role (type, page_id, role, user_id, user_name) VALUES (?, ?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [type, page_id, role, user_id, user_name]);
    return result;
  }

  // 根据ID删除
  async delete(id) {
    const statement = 'DELETE FROM pages_role WHERE id = ?;';
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  // 根据页面ID删除
  async deleteByPageId(page_id) {
    const statement = 'DELETE FROM pages_role WHERE page_id = ?;';
    const [result] = await connection.execute(statement, [page_id]);
    return result;
  }
}

module.exports = new PagesRoleService();
