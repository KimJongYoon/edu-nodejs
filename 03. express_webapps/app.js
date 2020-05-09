const express = require('express');

const app = express();
const port = 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('views', './views');
app.set('view engine', 'pug');

const fs = require('fs'); //파일 시스템 접근을 위한 라이브러리 포함

const dataDir = './data'


app.get('/topic/new', (req,res)=>{ // 토픽 새로 만들기 페이지
    res.render('new', {...RenderUtil.view_files()});
})


app.post('/topic', (req,res)=>{ // 토픽을 새로만드는 곳
    const _title = req.body.title;
    const _desc = req.body.desc;
    fs.writeFile(`${dataDir}/${_title}`,_desc, (err)=>{
        if (err) {
            res.status(500).send("Internal Server Error");
            // console.error(err);
            throw err;
        }
        console.log(`title: ${_title}
                    desc: ${_desc}
                    `);
        // res.render('view', {...RenderUtil.view_files()});
        res.redirect(`topic/${_title}`); // 사용자가 작성한 뷰가 바로 보이도록 한다.
    });
})

// app.get('/topic', (req,res)=>{
    
//     console.log(`----------------------------------`);
//     console.log(RenderUtil.view_files());
//     res.render('view', {...RenderUtil.view_files()});
// });


// app.get('/topic/:file', (req,res)=>{
app.get(['/topic', '/topic/:file'], (req,res)=>{
    const _path = req.params.file;
    let _files = [];
    fs.readdir(dataDir, (err, files)=>{//data 디렉토리의 파일 목록을 불러온다.
        _files = [...files];
    });

    if(_path) { //_path 변수가 있으면 상세 파일 정보를 불러온다.
        fs.readFile(`${dataDir}/${_path}`, (err,data)=>{
            if(err){
                console.log(err);
                res.send(`Internal Server Error`);
            }
            console.log(`file: ${_path},     data : ${data}`);
        
            res.render('view', {...RenderUtil.view_files(), _file : _path, _desc : data})  
        })
    }else{

        //_path가 없으면 그냥 렌더링
        res.render('view', {...RenderUtil.view_files(), _file : `Home`, _desc : `Home Page`})  
    }
    
})

class RenderUtil{
    static view_files(){
        return {_files : fs.readdirSync(dataDir)};
    } //view_files
}

app.listen(3000, ()=>{
    console.log(`app.js listening on port ${port}`);
});