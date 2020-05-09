// module.exports = (express)=>{
const topicService = require('./topicService');

module.exports = (app)=>{
    const express = require('express');
    const router = express.Router();

    router.get([`/`, `/:id`], async (req,res)=>{
        const id = req.params.id;
       
        if(id === "add"){
            res.render('add', await CommonFunc.getTopicsTopic(id));
        }else{
            res.render('view',await CommonFunc.getTopicsTopic(id));
        }

    });

    router.post(`/add`, async (req,res)=>{
        const title = req.body.title;
        const desc = req.body.desc;

        const insertResult = await topicService.insertTopic({params:{title : title, desc : desc}});
        
        res.redirect(`/topic/${encodeURIComponent(insertResult[0]['@rid'])}`);
    });

    router.route(`/:id/edit`)

        .get(async (req,res)=>{
            const id = req.params.id;
            res.render("edit", await  CommonFunc.getTopicsTopic(id));
        })

        .post(async (req,res)=>{
            const id = req.params.id;
            const title = req.body.title;
            const desc = req.body.desc;
    
            topicService.updateTopic({params: {rid : id, title: title, desc : desc}}); // 수정
    
            res.render("view", await  CommonFunc.getTopicsTopic(id));
        })


    router.route(`/:id/del`)
    
        .get(async (req,res)=>{
            const id = req.params.id;
            res.render("del" , await CommonFunc.getTopicsTopic(id));
        })

        .post(async (req,res)=>{
            const id = req.params.id;
            topicService.deleteTopic({params: {rid : id}});
            res.render('view', await CommonFunc.getTopicsTopic(id));
        })

   

    class CommonFunc{
        static async getTopicsTopic(id){
            const topics = await topicService.getAllTopics(); // 전체 토픽내용을 갖고 온다.
            const topic = (id != null) ? await topicService.getTopics({params:{rid : id}}) : {}; // 선택된 토픽 내용만 갖고 온다.
            return {topics : topics, topic : topic};
        }
    }



    app.use(`/topic`,router);
    return router;
}