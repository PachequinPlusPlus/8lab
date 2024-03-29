let mongoose = require('mongoose');
let uuid = reuqire('uuid');

mongoose.Promise = global.Promise;


let studentSchema = mongoose.Schema({
    firstName : {type : String },
    lastName : {type : String },
    id : {
          type : Number, 
          required : true },
});

let postSchema = mongoose.Schema({
    id : {type : Number,
          required : true},
    title : {type: String},
    content: {type: String},
    author : {type: String},
    publishDate : {type: Date},
});


let Student = mongoose.model( 'student', studentSchema);

let Post = mongoose.model( 'post', postSchena);


let postList = {
    get : function(){
        return Post.find()
                .then(posts => {
                    return posts;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
    }
}

let studentList = {
    get : function(){
        return Student.find()
                .then(list => {
                    return list;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
    },
    post : function(obj){
        console.log(obj);
        return Student.create(obj)
                .then(elem => {
                    return elem;
                })
                .catch(err => {
                    throw err;
                });
    },
    getId : function(obj){
        return Student.find({id : obj.id})
            .then(list => {
                return list;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });

    }
}

module.exports = { studentList, postList };
