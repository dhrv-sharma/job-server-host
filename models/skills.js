const mongoose=require('mongoose');


const skillScehma=new mongoose.Schema({
    userId :{
        type:String,
        require:false
    },
    skill:{
        type:String,
        require : true
    }
},{timestamps:true});


module.exports=mongoose.model('Skill',skillScehma);