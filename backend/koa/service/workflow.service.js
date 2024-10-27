const connection = require('../sql');
class PagesService {
  async listCount(keyword, userId) {
    const statement =
      "SELECT COUNT(`id`) total FROM workflows WHERE (form_name like COALESCE(CONCAT('%',?,'%'), form_name) OR ? IS NULL) AND user_id = ?";
    const [result] = await connection.execute(statement, [keyword || null, keyword || null, userId]);
    return result[0];
  }
  async list(pageNum, pageSize, keyword, userId) {
    const offset = (+pageNum - 1) * pageSize + '';
    const limit = pageSize;
    const statement = `
      SELECT 
        id,
        form_name,
        form_desc,
        page_id,
        user_name,
        updated_at
      FROM 
        workflows 
      WHERE
        (form_name LIKE COALESCE(CONCAT('%',?,'%'), form_name) OR ? IS NULL) AND user_id = ?
      ORDER BY
        updated_at 
      DESC
      LIMIT ${offset},${limit};`;
    const [result] = await connection.execute(statement, [keyword || null, keyword || null, userId]);
    return result;
  }

  async createTemplate(form_name, form_desc = '', user_id, user_name) {
    const statement = 'INSERT INTO workflows (form_name, form_desc, user_id, user_name) VALUES (?, ?, ?,?);';
    const [result] = await connection.execute(statement, [form_name, form_desc, user_id, user_name]);
    return result;
  }

  async getDetailById(id, user_id) {
    const statement = 'select * from workflows where id = ? and user_id = ?;';
    const [result] = await connection.execute(statement, [id, user_id]);
    return result;
  }

  async deleteTemplateById(id, user_id) {
    const statement = 'DELETE FROM workflows WHERE id = ? and user_id = ?;';
    const [result] = await connection.execute(statement, [id, user_id]);
    return result;
  }

  async updateTemplate(id, form_name, form_desc, page_id, template_data, user_id) {
    let statement = `UPDATE workflows SET updated_at = ?`;
    let sql_params = [new Date()];
    if (form_name) {
      statement += `, form_name = ?`;
      sql_params.push(form_name);
    }

    if (form_desc) {
      statement += `, form_desc = ?`;
      sql_params.push(form_desc);
    }

    if (page_id) {
      statement += `, page_id = ?`;
      sql_params.push(page_id);
    }

    if (template_data) {
      statement += `, template_data = ?`;
      sql_params.push(template_data);
    }

    statement += ` WHERE id = ? and user_id = ?;`;
    sql_params.push(id);
    sql_params.push(user_id);
    const [result] = await connection.execute(statement, sql_params);
    return result;
  }
}

module.exports = new PagesService();
