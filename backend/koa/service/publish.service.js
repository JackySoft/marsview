const connection = require('../sql');
class PublishService {
  async listCount(env, user_name, created_at, updated_at, page_id) {
    const statement = `
    SELECT *
      FROM pages_publish
      WHERE
        (env = COALESCE(?, env) OR ? IS NULL)
        AND (user_name = COALESCE(?, user_name) OR ? IS NULL)
        AND (created_at >= ? OR ? IS NULL)
        AND (updated_at <= ? OR ? IS NULL)
        AND (page_id = COALESCE(?, page_id) OR ? IS NULL)
    `;
    const [result] = await connection.execute(statement, [
      env || null,
      env || null,
      user_name || null,
      user_name || null,
      created_at || null,
      created_at || null,
      updated_at || null,
      updated_at || null,
      page_id || null,
      page_id || null,
    ]);
    return result.length;
  }

  async list({ env, user_name, created_at, updated_at, page_id, pageNum = 1, pageSize = 10 }) {
    const offset = (+pageNum - 1) * pageSize + '';
    const limit = pageSize;
    // const statement = `SELECT * FROM pages_publish ORDER BY id DESC LIMIT ${offset},${limit};`;
    const statement = `
    SELECT *
      FROM pages_publish
      WHERE
        (env = COALESCE(?, env) OR ? IS NULL)
        AND (user_name = COALESCE(?, user_name) OR ? IS NULL)
        AND (created_at >= ? OR ? IS NULL)
        AND (updated_at <= ? OR ? IS NULL)
        AND (page_id = COALESCE(?, page_id) OR ? IS NULL)
      ORDER BY id DESC
      LIMIT ${offset},${limit};
    `;
    const [result] = await connection.execute(statement, [
      env || null,
      env || null,
      user_name || null,
      user_name || null,
      created_at || null,
      created_at || null,
      updated_at || null,
      updated_at || null,
      page_id || null,
      page_id || null,
    ]);
    return result;
  }

  async createPublish(page_id, page_name, page_data, user_name, user_id, env) {
    const statement = 'INSERT INTO pages_publish (page_id, page_name, page_data, user_name, user_id, env) VALUES (?, ?, ?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [page_id, page_name, page_data, user_name, user_id, env]);
    return result;
  }
}

module.exports = new PublishService();
