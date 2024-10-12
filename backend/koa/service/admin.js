const connection = require('../sql');

class AdminService {
  async getProjectConfig(project_id) {
    const statement = `SELECT * FROM projects WHERE id = ?;`;
    const [result] = await connection.execute(statement, [project_id]);
    return result;
  }
  async getAllMenuList(project_id) {
    const statement = `SELECT * FROM menu WHERE project_id = ?;`;
    const [result] = await connection.execute(statement, [project_id]);
    return result;
  }
  async getMenuList(menuIds, role_id) {
    const statement = `SELECT m.*  
                      FROM menu m  
                      JOIN roles r ON m.id in(${menuIds}) > 0  
                      WHERE r.id = ?;`;
    const [result] = await connection.execute(statement, [role_id]);
    return result;
  }
  async getPageDetailById(id) {
    const statement = `SELECT * FROM pages WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async getLastPublishInfo(page_id, publish_id) {
    const statement = `SELECT * FROM pages_publish WHERE page_id = ? && id = ?;`;
    const [result] = await connection.execute(statement, [page_id, publish_id]);
    return result;
  }
}

module.exports = new AdminService();
