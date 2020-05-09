const express = require('express');

const app = express();

const port = 3000;

/** 라우팅 시작 */
app.get("/", (req,res)=>{   //get을 라우터라고 부르고 하는 일을 라우팅이라고 한다.(자바에선 서블릿)
    res.send('Hello hoem page');
});

app.get("/login", (req,res)=>{
    res.send('Login please');
});

app.get("/mulcall", (req,res,next)=>{
        console.log("/mulcall filter??");
        next(); // next() 함수를 사용하지 않으면 다음 함수로 진행되지 않음
    },
    (req,res)=>{
        console.log("/mulcall");
});

/** 라우터 관련한 건 https://expressjs.com/ko/guide/routing.html API문서보면 아주 좋게 나와있다. */
/** 라우팅 끝 */




/** 정적 파일 서비스 시작 */
app.use(express.static("public")); // http://localhost:3000/images/sky.jpg 로 이미지에 접근할 수 있다.

app.get('/route',(req,res) => {
    res.send(`Hello router, <img src='/images/sky.jpg'/>`); // 웹 브라우저에서도 접근 가능.
});

/** 정적 파일 서비스 끝 */


/** 동적 파일 시작 */
app.get('/dynamic', (req,res) => {
    let lis = '';
    for(let i=0; i<5; i++){
        lis += `<li>코딩</li>`;
    }

    const time = Date();
    const output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h1>Dynamic Html</h1>
        <ul>
            ${lis}
        </ul>
        ${time}
    </body>
    </html>`;

    res.send(output);
});

/** 동적 파일 끝 */


/** 템플릿 엔진(pug 구 jade) 사용하기 위한 셋팅 시작*/
app.set('views', './views');
app.set('view engine', 'pug');
/** 템플릿 엔진(pug 구 jade) 사용하기 위한 셋팅 끝*/

/** 템플릿 엔진을 활용한 웹페이지 라우터 */
app.get('/template', (req,res) => {
    res.render('01_temp', {time : Date(), title : '내 마음대로'});

});

/** 쿼리스트링 사용 시작*/
app.get("/topic", (req,res)=>{
    //쿼리 스트링 값을 가져오기 1: req.query.변수 
    //쿼리 스트링 값을 가져오기 2: req.param('변수');

    //내가 봤을 땐 req.param이 사용하기 편한데 요거 대신에 1번처럼 사용하랜다.

    let topic =
        [`Node.js Select`, `Pug Select`, `Express Select`];
    let str = `
        <a href="/topic?id=0"><h1>Node.js</h1></a>
        <a href="/topic?id=1"><h1>Pug</h1></a>
        <a href="/topic?id=2"><h1>Express</h1></a>
        ${topic[ req.param('id')]}
    `;

    res.send(str); //API 문서 참조
});
/** 쿼리스트링 사용 끝*/


/**시멘틱 url로 topic 구현 시작 */
//시멘틱에서 변수 값 가져올 땐 req.params.변수
app.get('/semantic/:id', (req, res)=>{
    
    let topic =
        [`Node.js Select`, `Pug Select`, `Express Select`];
    let str = `
        <a href="/semantic/0"><h1>Node.js</h1></a>
        <a href="/semantic/1"><h1>Pug</h1></a>
        <a href="/semantic/2"><h1>Express</h1></a>
        ${topic[ req.param('id')]}
    `;
    //${topic[ req.param.id]}

    res.send(str);
});
/**시멘틱 url로 topic 구현 끝*/



/**post-form을 이용한 데이터 전달 시작 */

/** Post를 이용한 데이터 전달을 받을 때 아래 3줄 bodyParser가 필요하다. */
const bodyParser = require('body-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.route('/form')
    .get((req, res)=>{
        res.render('02_form');
    })
    .post((req,res)=>{
        let _title = req.body.title;
        let _description = req.body.description;
        res.send(`title: ${_title},  decs: ${_description}`);
    })
/**post-form을 이용한 데이터 전달 끝 */



/**웹앱 재작 실습 시작 */

app.use(express.static("data")); // data 디렉토리 접근 가능토록(굳이 안필요할 수도..)
const fs = require('fs'); //파일 시스템 접근을 위한 라이브러리 포함


app.get('/web', (req, res)=>{
    fs.readdir("./data",(err, files)=>{
        console.log(files);
        res.render('03_web');
    });

});
app.route('/web/:path')
    .get((req,res)=>{
        const _path = req.params.path;

        switch(_path){
            case 'new' : res.render('03_new'); break;
            default : console.log("file");
        }
    })
    .post((req,res)=>{
        const _path = req.params.path;

    });


/**웹앱 재작 실습 끝*/


app.listen(3000, ()=>{
    console.log(`app.js listening on port ${port}`);
});