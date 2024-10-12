const connection = require('../sql');

class FireflyService {
  async listCount(name, status) {
    const statement =
      'SELECT COUNT(`id`) total FROM firefly WHERE (name = COALESCE(?, name) OR ? IS NULL) AND (status = COALESCE(?, status) OR ? IS NULL);';
    const [result] = await connection.execute(statement, [name || null, name || null, status >= 0 ? status : null, status >= 0 ? status : null]);
    return result[0];
  }
  async list(pageNum, pageSize, name, status) {
    const offset = (+pageNum - 1) * pageSize + '';
    const limit = pageSize;
    const statement = `SELECT * FROM firefly WHERE (name = COALESCE(?, name) OR ? IS NULL) AND (status = COALESCE(?, status) OR ? IS NULL) LIMIT ${offset},${limit};`;
    const [result] = await connection.execute(statement, [name || null, name || null, status >= 0 ? status : null, status >= 0 ? status : null]);
    return result;
  }

  async create(params) {
    const statement = 'INSERT INTO firefly (name, type, avatar, time, skill, sales, status, area) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [
      params.name,
      params.type,
      params.avatar || '',
      params.time,
      params.skill,
      params.sales,
      params.status || '',
      params.area,
    ]);
    return result;
  }

  // 根据页面ID删除
  async deleteById(id) {
    const statement = 'DELETE FROM firefly WHERE id = ?;';
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new FireflyService();
