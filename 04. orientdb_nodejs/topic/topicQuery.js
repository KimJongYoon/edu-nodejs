const db = require('../config/db/orientdb').db;

class topicQuery{
    static instance;
    constructor(){
        if(topicQuery.instance) return topicQuery.instance;
        topicQuery.instance = this;
    }

    async selectAll(){
        // const result = await db.query(`SELECT * FROM TOPIC`);
        // return result;
        return await db.query(`SELECT * FROM TOPIC`);
    }

    async select(where){
        let sql = `SELECT * FROM TOPIC WHERE @rid = :rid`;
        console.log(where);
        // if(where.params){
        //     sql += `WHERE 1=1 `;
        //     console.log(where.params);
        //     if(where.params.title) sql += `and title = :title `
        //     if(where.params.desc) sql += `and desc = :desc% `
        // }
        console.log(sql);
        // return await db.query(`SELECT * FROM TOPIC WHERE title=:title and \`desc\`=:desc`,params);
        return await db.query(sql,where);
    }

    async insert(data){
        console.log(`insert data : ${data}`);
        let sql = `INSERT INTO TOPIC (title, \`desc\`) VALUES(:title, :desc)`;
        return await db.query(sql,data);
    }
    
    async update(data){
        console.log(`update data : ${data}`);
        let sql = `UPDATE TOPIC SET title = :title, \`desc\` = :desc WHERE @rid = :rid`;
        return await db.query(sql,data);
    }
    
    async delete(data){
        console.log(`delete data : ${data}`);
        let sql = `DELETE FROM TOPIC WHERE @rid = :rid`;
        return await db.query(sql,data);
    }
}

module.exports = new topicQuery();