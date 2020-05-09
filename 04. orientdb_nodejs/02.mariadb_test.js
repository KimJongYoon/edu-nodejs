const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    port: 33306,
    user: 'root',
    password: '1234',
    database: 'fff',
    connectionLimit: 5});

/**위 함수 처럼 메소드를 짜면 중복 코드가 많다.
 * 자바스크립트의 proxy를 활용하여 중복코드를 제거한다.
 *  중복코드 : 1) try, catch, final
 *            2) await pool.getConnection(); , conn.release();
 * 
 */


class DbManager{
  constructor(_pool = {}){
    this.pool = _pool;
  }

  async exec(query, params){
    let conn;
    let rows;
    try {
      conn = await pool.getConnection();
      console.log(query, params);
      rows = await conn.query(query, params);
      console.log(rows);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return rows;
  }
}

class Topic extends DbManager{
  async select(params){
    return await super.exec("select * from tb where id=?",params);
  }
}

const topic = new Topic();

topic.select(  ['213']);
