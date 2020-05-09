const OrientDB = require('orientjs');
const dbProp = require(`../../prop/dbProp`);
// DB 접속 정보
const server = OrientDB({
    host:       dbProp.host,
    port:       dbProp.port,
    username:   dbProp.username,
    password:   dbProp.password
 });

const db = server.use({
    name : dbProp.database,
}); // 'o2' 데이터베이스에 연결

module.exports.OrientDB = OrientDB;
module.exports.server = server;
module.exports.db = db;