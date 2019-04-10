const db = require('./connection');
const Joi = require('joi');
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).required(),
    subject: Joi.string().required(),
    message: Joi.string().max(200),
    imgURL: Joi.string().uri({
        scheme:[
            /https?/
        ]
    })
});

const messages = db.get('messages');


//get
function getAll(){
    
    return messages.find();
}

//add
function create(message){
    if(!message.username) message.username = "Anonymous";
    const result = Joi.validate(message, schema);
    if(result.error == null){
        message.created = new Date();
        return messages.insert(message);
    }else{
        return Promise.reject(result.error);
    }

};



module.exports = {
    create,
    getAll
};