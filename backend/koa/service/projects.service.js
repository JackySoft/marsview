const connection = require('../sql');
class ProjectsService {
  async listCount(keyword, type, userId) {
    const statement =
      `SELECT COUNT(id) total FROM projects WHERE (name like COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) AND ` +
      (type == 1 ? 'user_id = ?' : 'user_id != ?');
    const [result] = await connection.execute(statement, [keyword || null, keyword || null, userId]);
    return result[0];
  }
  async list(pageNum, pageSize, keyword, type, userId) {
    const offset = (+pageNum - 1) * pageSize + '';
    const limit = pageSize;
    const statement =
      `
      SELECT   
        p.*,  
        SUBSTRING_INDEX(p.user_name, '@', 1) as user_name,
        CASE
          WHEN pr.page_id > 0 THEN JSON_ARRAYAGG(JSON_OBJECT('id', pr.id, 'role', pr.role, 'user_id', pr.user_id, 'user_name', pr.user_name))
          ELSE null
          END AS members
      FROM 
        projects p  
      LEFT JOIN   
        pages_role pr ON p.id = pr.page_id AND pr.type = 1 
      WHERE 
        (name like COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) AND ` +
      (type == 1 ? 'p.user_id = ?' : 'p.user_id != ?') +
      `
      GROUP BY
          p.id ORDER BY p.id DESC LIMIT ${offset},${limit};`;
    const [result] = await connection.execute(statement, [keyword || null, keyword || null, userId]);
    return result;
  }

  // 自己拥有的项目列表
  async ownList(pageNum, pageSize, userId) {
    const offset = (+pageNum - 1) * pageSize + '';
    const limit = pageSize;
    const statement = `SELECT id, name, remark, logo, updated_at FROM projects WHERE user_id = ${userId} LIMIT ${offset},${limit};`;
    console.log('statement', statement);
    const [result] = await connection.execute(statement);
    return result;
  }

  // 自己名下项目总数
  async ownListCount(userId) {
    const statement = 'SELECT COUNT(`id`) total FROM projects where user_id = ?;';
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }

  async getProjectByName(name) {
    const statement = `SELECT * FROM projects WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async createProject({
    name,
    remark,
    logo,
    visit_type = 1,
    user_name,
    user_id,
    layout = 1,
    menu_mode = 'inline',
    menu_theme_color = 'dark',
    system_theme_color,
    breadcrumb = 1,
    tag = 1,
    footer = 1,
    is_public = 1,
  }) {
    const statement =
      'INSERT INTO projects (name, remark, logo, visit_type, user_name, user_id, layout,menu_mode,menu_theme_color,system_theme_color,breadcrumb,tag,footer,is_public) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?);';
    const [result] = await connection.execute(statement, [
      name,
      remark,
      logo,
      visit_type,
      user_name,
      user_id,
      layout,
      menu_mode,
      menu_theme_color,
      system_theme_color,
      breadcrumb,
      tag,
      footer,
      is_public,
    ]);
    return result;
  }

  async getProjectInfoById(id) {
    const statement = "SELECT *,SUBSTRING_INDEX(user_name, '@', 1) as user_name FROM projects WHERE id = ?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async deleteProject(id, userId) {
    const statement = 'DELETE FROM projects WHERE id = ? and user_id = ?;';
    const [result] = await connection.execute(statement, [id, userId]);
    return result;
  }

  async updateProjectInfo({
    id,
    name,
    remark,
    logo,
    visit_type = 1,
    layout = 1,
    menu_mode = 'inline',
    menu_theme_color = 'dark',
    system_theme_color,
    breadcrumb = 1,
    tag = 1,
    footer = 1,
    is_public = 1,
  }) {
    const statement =
      'UPDATE projects SET name = ?, remark = ?, logo = ?, visit_type = ?, layout = ?, menu_mode = ?, menu_theme_color = ?, system_theme_color = ?, breadcrumb = ?, tag = ?, footer = ?, is_public = ? WHERE id = ?;';
    const [result] = await connection.execute(statement, [
      name,
      remark,
      logo,
      visit_type,
      layout,
      menu_mode,
      menu_theme_color,
      system_theme_color,
      breadcrumb,
      tag,
      footer,
      is_public,
      id,
    ]);
    return result;
  }
}

module.exports = new ProjectsService();
