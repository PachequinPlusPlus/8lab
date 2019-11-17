let express = require("express");
let bodyParser = require('body-parser');
let morgan = require("morgan");
let cat = require("cat-me");
let mongoose = require('mongoose');
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

app.get("/api/students", function(req, res, next){
});

app.post("/api/postStudent", jsonParser, (req, res) => {

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
