const OrientDB = require('orientjs');

// DB 접속 정보
const server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   '1234'
});

let db = server.use({
    name : 'o2',
    username: 'root',
    password: '1234' 
}); // 'o2' 데이터베이스에 연결

/** 전체 데이터 조회 시작 */
// let sql = `SELECT * FROM TOPIC`;
// db.query(sql).then((results)=>{
    //     console.log(results);
    // });
/** 전체 데이터 조회 끝*/
    

/**하나의 데이터 조회 시작 */
// let sql = `SELECT * FROM TOPIC WHERE @rid=:rid`; // WHERE @rid=:rid 추가
// let params = {
//     params: {
//         rid: '#12:1'
//     }
// }
//query 함수에 params 추가
// db.query(sql, params).then((results)=>{
//     console.log(results);
// });
/**하나의 데이터 조회 끝 */

/**데이터 입력 시작 */
// let insertSql = `INSERT INTO TOPIC(title, \`desc\`)  VALUES(:title, :desc)`;
// let insertParam = {
//     params : {
//         title : `Express`,
//         desc : `Express is Framework for web`
//     }
// }
// db.query(insertSql, insertParam).then((results)=>{
//     console.log(results);
// });
/**데이터 입력 끝 */

/**데이터 수정 시작 */
// let updateSql = `UPDATE TOPIC SET title=:title, \`desc\`=:desc  WHERE @rid=:rid`;
// db.query(updateSql,{params:{title: 'Java', desc: 'Java 1.8', rid: '#12:3'}}).then((results)=>{
//     console.log(results);
// });
/**데이터 수정 끝 */


/**데이터 삭제 시작 */
let delSql = `DELETE FROM TOPIC WHERE @rid=:rid`
db.query(delSql, {params:{rid:'#12:2'}}).then((results)=>{
    console.log(results);
})
/**데이터 삭제 끝 */



//1개의 행의 데이터를 가져옴
/*
let rec = db.record.get('#12:1')
   .then(
      function(record){
         console.log('Loaded Record:', record);
       }
   );
*/