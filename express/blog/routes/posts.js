const fs = require('fs')

module.exports = {
    //curl "http://localhost:3000/posts"
    getPosts (req,res){
        req.status(200).send(req.store.posts);
    },
    
    // curl "http://localhost:3000/posts/1"
    getOnePost (req, res) {
        const id = req.params.postId
        if(!req.store.posts[id]) throw new Error('Not Found')
        res.status(200).send(req.store.posts[id])
    },

    // curl -H "Content-Type: application/json" -X POST -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}'  "http://localhost:3000/posts" 
    addPost(req,res){
        req.store.posts.push(req.body);
        fs.writeFileSync('./data.json',JSON.stringify(req.store,null,4));
        res.status(201).send({id:req.store.posts.length - 1})
    },

    //curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Top 10 ES6 Features Every Developer Must Know", "url":"http://webapplog.com/es6", "text": ""}' "http://localhost:3000/posts/0"
    updatePost(req,res){
        const id = req.params.postId;
        if(!req.store.posts[id]) throw new Error('Not Found');
        req.store.posts[id] = req.body;
        //req.store.posts[id] = Object.assign(req.store.posts[id], req.body)
        fs.writeFileSync('./data.json',JSON.stringify(req.store,null,4));
        res.status(204).send(req.store.posts[id])
    },

    //curl -X DELETE "http://localhost:3000/posts/0" 
    delPost(req,res){
        const id = req.params.postId;
        if(!req.store.posts[id]) throw new Error('Not Found');
        req.store.posts.splice(id,1);
        /* req.store.posts[id]={
            name:"deleted"
        } */
        fs.writeFileSync('./data.json',JSON.stringify(req.store,null,4));
        res.status(204).send()
    }
}