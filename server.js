let express = require("express");
let bodyParser = require('body-parser');
let morgan = require("morgan");
let cat = require("cat-me");
let mongoose = require('mongoose');
let {postList} = require('./blog-post-model.js');
let uuid = require('uuid');

const {DATABASE_URL, PORT} = require('./config.js');

let jsonParser = bodyParser.json();

let app = express();
app.use(express.static('public'));
app.use(morgan('combined'));

let names = [
    {
        name : "ravioli",
        id : 1234567
    }, 
    {
        name: "ravioli2",
        id : 898989,
    }];

mongoose.Promise = global.Promise;
console.log(cat());

app.get("/blog-posts", function(req, res, next){
    postList.get()
        .then(list => {
            res.statusMessage = "done";
            return res.status(200).json(list);
        })
        .catch(err => {
            res.statusMessage = "something went wrong";
            return res.status(400).json({status: 400, message: "something went wrong"});
        });
});

app.get("/blog-post", function(req, res, next){
    author = req.query.author
    if(!author){
        return res.status(406).json({status: 406, message: "author not providied"});
    }
    postList.auth(author)
        .then( list => {
            res.statusMessage ="done";
            if(list.length == 0){
                return res.status(404).json({status: 404, message : " author doesnt exists"});
            }
            return res.status(200).json(list);
        })
        .catch(err => {
            res.statusMessage = "something went wrong";
            return res.status(400).json({status: 400, message: " something went wrong"});
        });
});

app.post("/blog-posts", jsonParser, (req, res) => {
    title = req.body.title;
    content = req.body.content;
    author = req.body.author;
    dd = req.body.publishDate;
    if(!title || !content || !author || !dd){
        return res.status(406).json({status: 406, message : " something went wrong"});
    }
    publishDate = new Date(dd);
    id = uuid.v4();
    console.log(id);

    let obj = {
        title,
        content,
        author,
        publishDate,
        id
    }

    postList.post(obj)
        .then( elem => {
            return res.status(201).json(elem);
        })
        .catch( err => {
            return res.status(400).json({status: 400, message : " something went wrong"});
        });
});


app.delete("/blog-posts/:id", (req, res) => {
    id = req.params.id;
    
    console.log(id);
    postList.findId(id)
        .then( elem => {
            if(elem.length == 0){
                return res.status(404).json({status: 404, message: "id doesnt exists"});
            }
                postList.deleteId(id)
                    .then ( elem => {
                        return res.status(200).json(elem);
                    })
                    .catch( err => {
                        return res.status(400).json({status: 400, message : "something went wrong"});
                    });

        })
        .catch( err => {
            return res.status(400).json({status: 400, message : " something went wrong"});
        });
    

});


app.put("/blog-posts/:id", jsonParser, (req, res) => {
    _id = req.body.id;
    if(!_id){
        return res.status(406).json({status: 406, message : "id is missing in body"});
    }
    _id2 = req.params.id;
    if(_id != _id2){
        return res.status(409).json({status: 409, message: "id doesnt not match"});
    }

    postList.update(_id, req.body)
        .then ( elem => {
            return res.status(202).json(elem);
        })
        .catch ( err => {
            console.log(err);
            return res.status(400).json({status: 400, message : " something went wrong"});
        });

});

let server;
function runServer(port, databaseUrl){
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if(err){
                return reject(err);
            }else{
                server = app.listen(port, () => {
                    console.log("soppa de macaco uma delicia kkk");
                    console.log(cat());
                    resolve();
                })
                .on('error', error => {
                    mongoose.disconnect();
                    return reject(err);
                });
            }
        });
    });
}

runServer(PORT, DATABASE_URL)
        .catch(err => {
            console.log(err);
        });

function closeServer(){
 return mongoose.disconnect()
     .then(() => {
         return new Promise((resolve, reject) => {
         console.log('Closing the server');
                 server.close( err => {
                 if (err){
                     return reject(err);
                 }
                 else{
                     resolve();
                 }
             });
         });
     });
}

module.exports = {app, runServer, closeServer }
