const fs = require('fs');

module.exports = {
    // curl "http://localhost:3000/posts/:postId/comments"
    getComments(req,res){
        const postId = req.params.postId;
        if(!req.store.posts[postId]) throw new Error('Not Found');
        res.status(200).send(req.store.posts[postId].comments);
    },

    //curl "http://localhost:3000/posts/:postId/comments/:comId"
    getOneComment(req,res){
        const postId = req.params.postId;
        if(!req.store.posts[postId]) throw new Error('Not Found');
        const comId = req.params.comId;
        if(!req.store.posts[postId].comments[comId]) throw new Error('Not Found');
        res.status(200).send(req.store.posts[postId].comments[comId]);
    },

    // curl -H "Content-Type: application/json" -X POST -d '{"text": "boom!"}'  "http://localhost:3000/posts/:postId/comments"
    addComment(req,res){
        const postId = req.params.postId;
        if(!req.store.posts[postId]) throw new Error('Not Found');
        if(!req.store.posts[postId].comments) req.store.posts[postId].comments=[];
        req.store.posts[postId].comments.push(req.body);
        fs.writeFileSync('./data.json',JSON.stringify(req.store,null,4));
        res.status(201).send({id:req.store.posts[postId].comments.length - 1})
    },

    //curl -H "Content-Type: application/json" -X PUT -d '{"text": "boom!"}'  "http://localhost:3000/posts/:postId/comments"curl -H 'Content-Type: application/json' -X PUT -d '{"text": "ping"}' "http://localhost:3000/posts/0/comments/3"
    updateComment(req,res){
        const postId = req.params.postId;
        //if(!req.store.posts[postId]) throw new Error('Not Found');
        const comId = req.params.comId;
        if(!req.store.posts[postId].comments[comId]) throw new Error('Not found');
        req.store.posts[postId].comments[comId]=req.body;
        fs.writeFileSync('./data.json',JSON.stringify(req.store,null,4));
        res.status(204).send(req.store.posts[postId].comments[comId]);
    },

    //curl -X DELETE "http://localhost:3000/posts/0/comments/3" 
    delComment(req,res){
        const postId = req.params.postId;
        //if(!req.store.posts[postId]) throw new Error('Not Found');
        const comId = req.params.comId;
        if(!req.store.posts[postId].comments[comId]) throw new Error('Not found');
        //req.store.posts[postId].comments.splice(comId,1);
        req.store.posts[postId].comments[comId] = {
            text: `deleted at ${new Date().getDate()}`
            //text: `deleted`
        }
        fs.writeFileSync('./data.json',JSON.stringify(req.store,null,4));S
        res.status(204).send(req.store.posts[postId].comments[commentId]); 
    }
}