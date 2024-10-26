const connection = require('../sql');
class PagesService {
  async listCount(keyword, type, userId) {
    const statement =
      "SELECT COUNT(`id`) total FROM pages WHERE (name like COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) AND " +
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
        p.id,
        p.name,
        p.user_id,
        p.user_name,
        p.remark,
        p.is_public,
        p.is_edit,
        p.preview_img,
        p.stg_publish_id,
        p.pre_publish_id,
        p.prd_publish_id,
        p.stg_state,
        p.pre_state,
        p.prd_state,
        p.project_id,
        p.updated_at,
        SUBSTRING_INDEX(p.user_name, '@', 1) as user_name,
        (  
        SELECT JSON_ARRAYAGG(  
            JSON_OBJECT('id', pr.id, 'role', pr.role, 'user_id', pr.user_id, 'user_name', pr.user_name)  
        )  
        FROM pages_role pr  
        WHERE pr.page_id = p.id  
        ) AS members  
      FROM 
          pages p 
      WHERE 
        (name like COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) AND ` +
      (type == 1 ? 'p.user_id = ?' : 'p.user_id != ?') +
      `
      ORDER BY 
        p.updated_at DESC LIMIT ${offset},${limit};`;
    const [result] = await connection.execute(statement, [keyword || null, keyword || null, userId]);
    return result;
  }

  // 查询页面模板总条数
  async listPageTemplateCount(keyword) {
    const statement = "SELECT COUNT(`id`) total FROM pages WHERE (name like COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) AND is_public = 3;";
    const [result] = await connection.execute(statement, [keyword || null, keyword || null]);
    return result[0];
  }

  // 查询页面模板
  async listPageTemplate(pageNum, pageSize, keyword) {
    const offset = (+pageNum - 1) * pageSize + '';
    const statement = `SELECT id,
      name,
      user_id,
      user_name,
      remark,
      is_public,
      is_edit,
      preview_img,
      stg_publish_id,
      pre_publish_id,
      prd_publish_id,
      stg_state,
      pre_state,
      prd_state,
      project_id,
      updated_at,
      SUBSTRING_INDEX(user_name, '@', 1) as user_name 
    FROM 
      pages 
    WHERE 
      (name like COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) 
    AND 
      is_public = 3 
    ORDER BY 
      updated_at DESC LIMIT ?,?;`;
    const [result] = await connection.execute(statement, [keyword || null, keyword || null, offset, pageSize]);
    return result;
  }

  async getPageInfoById(id) {
    const statement = "SELECT *,SUBSTRING_INDEX(user_name, '@', 1) as user_name FROM pages WHERE id = ?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async getPageSimpleById(id) {
    const statement = "SELECT user_id, SUBSTRING_INDEX(user_name, '@', 1) as user_name, is_public, is_edit FROM pages WHERE id = ?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async createPage(name, user_id, user_name, remark = '', page_data, is_public, is_edit, project_id = 0) {
    const statement =
      'INSERT INTO pages (name, user_id, user_name, remark, page_data, is_public, is_edit,project_id) VALUES (?, ?, ?, ?, ?, ?, ?,?);';
    const [result] = await connection.execute(statement, [name, user_id, user_name, remark, page_data, is_public, is_edit, project_id]);
    return result;
  }

  async deletePage(page_id, user_id) {
    const statement = 'DELETE FROM pages WHERE id = ? and user_id = ?;';
    const [result] = await connection.execute(statement, [page_id, user_id]);
    return result;
  }

  //state=> 1: 未保存 2: 已保存 3: 已发布 4: 已回滚
  async updatePageInfo(name, remark, page_data, is_public, is_edit, id, preview_img) {
    let statement = `UPDATE pages SET stg_state=2, pre_state=2, prd_state=2, name = ?, remark = ?, is_public = ?, is_edit = ?`;
    let sql_params = [name, remark, is_public, is_edit];

    if (preview_img) {
      statement += `, preview_img = ?`;
      sql_params.push(preview_img);
    }
    if (page_data) {
      statement += `, page_data = ?`;
      sql_params.push(page_data);
    }

    statement += ` WHERE id = ?;`;
    sql_params.push(id);
    const [result] = await connection.execute(statement, sql_params);
    return result;
  }

  //state=> 1: 未保存 2: 已保存 3: 已发布 4: 已回滚
  async updatePageState(last_publish_id, id, env, preview_img) {
    let statement = `UPDATE pages SET ${env}_state=3, ${env}_publish_id = ?`;
    let sql_params = [last_publish_id];
    if (preview_img) {
      statement += `, preview_img = ?`;
      sql_params.push(preview_img);
    }
    statement += ` WHERE id = ?;`;
    sql_params.push(id);
    const [result] = await connection.execute(statement, sql_params);
    return result;
  }

  async updateLastPublishId(page_id, last_publish_id, env) {
    const statement = `UPDATE pages SET ${env}_state=4, ${env}_publish_id = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [last_publish_id, page_id]);
    return result;
  }
}

module.exports = new PagesService();
