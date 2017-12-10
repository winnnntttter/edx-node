const express = require('../../node_modules/express')
const bodyParser = require('body-parser')
const logger = require('morgan')
//const errorhandler = require('errorhandler')
const {posts, comments} =require('./routes')

const app = express()

let store = require('./store')
if (process.env.NODE_ENV === 'testing') {
    app.set('port',process.env.PORT || 3001)
}else{
    app.set('port',process.env.PORT || 3000)
}

app.use(bodyParser.json());
app.use(logger('dev'));
//app.use(errorhandler());

app.use((req,res,next)=>{
    req.store = store;
    console.log("Add store to request");
    next();
})

app.get('/',(req,res)=>{
    res.send('Hello,try a route,like:\n /posts');
})

app.get('/posts',posts.getPosts);
app.get('/post/:postId',posts.getOnePost);
app.post('/posts',posts.addPost);
app.put('/posts/:postId',posts.updatePost);
app.delete('/posts/:postId',posts.delPost);

app.get('/posts/:postID/comments',comments.getComments);
app.get('/posts/:postID/comments/:comId',comments.getOneComment);
app.post('/posts/:postId/comments',comments.addComment);
app.put('/posts/:postId/comments/:comId',comments.updateComment);
app.delete('posts/:postId/comments/:comId',comments.delComment);


app.get('*',(req,res)=>{
    res.status(404).send('Not Found!');
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke!')
})

app.listen(app.get('port'),
    ()=>{
        console.log(`Server is listening at port:${app.get('port')}`)
    }
)

module.exports = app
