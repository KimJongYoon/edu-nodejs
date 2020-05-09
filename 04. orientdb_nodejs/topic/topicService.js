const topicQuery = require('./topicQuery');

class TopicService{
    static instance; // 싱글톤 객체를 위한 변수

    constructor(){
        if(TopicService.instance) return TopicService.instance;
        TopicService.instance = this;
    }
    async getAllTopics(){
        // const result = await topicQuery.selectAll();
        // return result;
        return await topicQuery.selectAll();
    }
    
    async getTopics(params){
        return await topicQuery.select(params);
    }

    async insertTopic(data){
        return await topicQuery.insert(data);
    }

    async updateTopic(data){
        return await topicQuery.update(data);
    }

    async deleteTopic(data){
        return await topicQuery.delete(data);
    }
}

module.exports = new TopicService();