const express = require('express');

const app = express();
const port = 3000;

//web config
const bodyParser = require('./config/web/bodyParser')(app);

//db config
// const dataSource = require('./config/db/orientdb'); // 각 서비스의 Query.js에서 실행된다.

//web router
const topic = require('./topic/topicRouter')(app);


app.listen(3000, ()=>{
    console.log(`app start(${port})`);
})