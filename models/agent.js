const mongoose=require('mongoose');


const agentSchema =new mongoose.Schema({
    userid:{
        type:String,
        required : true
    },
    uid:{
        type:String,
        required : true
    },
    company:{
        type:String,
        required : true
    },
    hq_address:{
        type:String,
        required : true
    },
    working_hrs:{
        type:String,
        required : true
    }


},{timestamps :true});

module.exports=mongoose.model('Agent',agentSchema);