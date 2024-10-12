const connection = require('../sql');
class PagesService {
  async listCount(keyword, type, userId) {
    const statement =
      "SELECT COUNT(`id`) total FROM lib WHERE (name like COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) AND " +
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
        *,
        SUBSTRING_INDEX(user_name, '@', 1) as user_name
      FROM 
        lib 
      WHERE
        (name LIKE COALESCE(CONCAT('%',?,'%'), name) OR ? IS NULL) AND ` +
      (type == 1 ? 'user_id = ? ' : 'user_id != ? ') +
      `ORDER BY
        updated_at 
      DESC
      LIMIT ${offset},${limit};`;
    const [result] = await connection.execute(statement, [keyword || null, keyword || null, userId]);
    return result;
  }

  async installList(user_id) {
    const statement = `
    SELECT a.id, a.tag, a.name, a.user_id, SUBSTRING_INDEX(a.user_name, '@', 1) as user_name,
           b.release_id, b.react_url, b.css_url, b.config_url, b.release_hash 
    FROM lib as a 
      right join lib_publish as b 
      on a.id = b.lib_id 
    WHERE b.user_id = ?
    ORDER BY
      a.updated_at DESC
    `;
    const [result] = await connection.execute(statement, [user_id]);
    return result;
  }

  async createLib(tag, name, description = '', user_id, user_name) {
    const statement = 'INSERT INTO lib (tag, name, description,user_id,user_name) VALUES (?, ?, ?,?,?);';
    const [result] = await connection.execute(statement, [tag, name, description, user_id, user_name]);
    return result;
  }

  async getDetailById(id) {
    const statement =
      "select a.*,SUBSTRING_INDEX(a.user_name, '@', 1) as user_name, b.release_id, b.react_url,b.css_url,b.config_url,b.release_hash from lib as a left join lib_publish as b on a.id = b.lib_id where a.id = ?";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async deleteLibById(id) {
    const statement = 'DELETE FROM lib WHERE id = ?;';
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async updateLib({ react_code, less_code, config_code, md_code, hash, id }) {
    let statement = `UPDATE lib SET updated_at = ?`;
    let sql_params = [new Date()];

    if (react_code) {
      statement += `, react_code = ?`;
      sql_params.push(react_code);
    }
    if (less_code) {
      statement += `, less_code = ?`;
      sql_params.push(less_code);
    }
    if (config_code) {
      statement += `, config_code = ?`;
      sql_params.push(config_code);
    }
    if (md_code) {
      statement += `, md_code = ?`;
      sql_params.push(md_code);
    }

    if (hash) {
      statement += `, hash = ?`;
      sql_params.push(hash);
    }

    statement += ` WHERE id = ?;`;
    sql_params.push(id);
    const [result] = await connection.execute(statement, sql_params);
    return result;
  }

  async publish({ lib_id, release_id, react_url, css_url, config_url, release_hash, user_id, user_name }) {
    console.log('sql', lib_id, release_id, react_url, css_url, config_url, release_hash, user_id, user_name);
    const statement =
      'INSERT INTO lib_publish (release_id, lib_id, react_url, css_url, config_url, release_hash, user_id, user_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [release_id, lib_id, react_url, css_url, config_url, release_hash, user_id, user_name]);
    return result;
  }

  async getPublishByLibId(lib_id) {
    const statement = 'SELECT * FROM lib_publish WHERE lib_id = ?;';
    const [result] = await connection.execute(statement, [lib_id]);
    return result[0];
  }

  async updateLibPublish({ lib_id, react_url, css_url, config_url, release_hash }) {
    let statement = `UPDATE lib_publish SET react_url = ?, config_url = ?, release_hash = ?, count = count + 1`;
    let sql_params = [react_url, config_url, release_hash];
    if (css_url) {
      statement += `, css_url = ?`;
      sql_params.push(css_url);
    }
    statement += ` WHERE lib_id = ?`;
    sql_params.push(lib_id);
    const [result] = await connection.execute(statement, sql_params);
    return result;
  }
}

module.exports = new PagesService();
