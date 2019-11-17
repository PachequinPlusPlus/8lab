let mongoose = require('mongoose');
let uuid = require('uuid');

mongoose.Promise = global.Promise;


let studentSchema = mongoose.Schema({
    firstName : {type : String },
    lastName : {type : String },
    id : {
          type : Number, 
          required : true },
});

let postSchema = mongoose.Schema({
    id : {type : String,
          required : true},
    title : {type: String},
    content: {type: String},
    author : {type: String},
    publishDate : {type: Date},
});


let Student = mongoose.model( 'student', studentSchema);

let Post = mongoose.model( 'post', postSchema);


let postList = {
    get : function() {
        return Post.find()
                .then( list => {
                    return list;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
    },
    auth : function(auth){
        return Post.find({author : auth})
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
        return Post.create(obj)
                .then(elem => {
                    return elem;
                })
                .catch(err => {
                    throw err;
                });
    },
    findId: function(sId){
        return Post.find({id: sId})
                .then( elem => {
                    return elem
                })
                .catch( err => {
                    throw err;
                });
    },
    deleteId: function(sId){
        return Post.remove({id: sId})
                .then( elem => {
                    return elem;
                })
                .catch( err => {
                    throw err;
                });
    },
    update: function(_id, obj){
        return Post.update({id : _id}, {$set: obj})
                .then( elem => {
                    return elem;
                })
                .catch ( err => {
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
