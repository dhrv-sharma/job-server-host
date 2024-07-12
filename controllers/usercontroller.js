// importing User mongoose schema
const User = require('../models/user');
const Skill=require('../models/skills');
const Agent=require('../models/agent');
// id is getting recieved through jwt toke access through req.user.id recieved passed in the authentication 
// updating user 
const updateUser = async(req,res)=>{
    try {
        const updatedUser=await User.findByIdAndUpdate(req.user.id,{$set:req.body},{new:true});

        return res.status(200).json({status:true});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

// deleting user 
const deleteUser = async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.user.id);
        return res.status(200).json({status:true});
        
    } catch (error) {
        return res.status(500).json({error:error.message})
        
    }
}

// get User
const getUser= async(req,res)=>{
    try {
        const profile=await User.findById(req.user.id);
        const {password,createdAt,updatedAt,__v,...userData}=profile._doc;
        return res.status(200).json(userData);
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}


// requires userid and body for the data 
const addSkill =async(req,res)=>{
    const newSkills =new Skill({userId:req.user.id,skill:req.body.skill});
    try {
        await newSkills.save();
        // on default user skill is set as false 
        await User.findByIdAndUpdate(req.user.id,{skills:true});
        return res.status(200).json(newSkills);

        
    } catch (error) {
        res.status(500).json({error:error.message});

        
    }

}

// requires the user id for getting skills 
const getSkill = async(req,res)=>{
    const userId=req.user.id;

    try {
        const skills=await Skill.find({userId : userId},{createdAt : 0,updatedAt:0 ,__v:0});

        if(skills.length === 0 ){
            // sending empty array if the length of the array is zeroo
            return res.status(200).json([]);
        }

        res.status(200).json(skills);
        
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
}

// deleting the skills 
const deleteSkill=async (req,res)=>{
    const skillId=req.params.id;

    try {
        await Skill.findByIdAndDelete(skillId);

        res.status(200).json({status:true});
        
        
    } catch (error) {
        res.status(500).json({error:error.message});

        
    }
}


//  add agent agent can post the job
const addAgent = async(req,res)=>{
    const newAgent =new Agent({
        userid:req.user.id,
        uid:req.body.uid,
        working_hrs:req.body.working_hrs,
        hq_address:req.body.hq_address,
        company:req.body.company
    });
    try {
        await newAgent.save();
        const user=await User.findByIdAndUpdate(req.user.id,{isAgent:true},{new:true});
        res.status(200).json({agent:newAgent,user:user});
        
    } catch (error) {
        res.status(500).json({error:error.message});

        
    }
}


// update agent
//need agent id
const updateAgent = async(req,res)=>{
    
    try {
        const updatedAgent=await Agent.findByIdAndUpdate(req.params.id,
        {
            working_hrs:req.body.working_hrs,
            hq_address:req.body.hq_address,
            company:req.body.company
        },{new:true});

        if (!updatedAgent) {
            return res.status(404).json({status : false,message:"Agent not found"});
            
        }
        
        res.status(200).json({agent:updatedAgent,status:true});
        
    } catch (error) {
        res.status(500).json({error:error.message});

        
    }
}


// getting a single agent 
// need user uid uid stored in firebase 
const getAgent= async (req,res)=>{
    try {
        // searching by uid
        const agentData=await Agent.find({uid:req.params.uid},{createdAt:0,updatedAt:0,__v:0});
        
        
        const agent=agentData[0];


        res.status(200).json(agent);
        
        
    } catch (error) {
        res.status(500).json({error:error.message});

        
    }
}


// getting agents
const getAgents= async(req,res)=>{
    try {
        const agents = await User.aggregate([
            {$match : {isAgent :true}},
            {$sample:{size:7}},
            {
                $project :{
                    _id:0,
                    userid:1,
                    username:1,
                    profile:1,
                    uid:1,
                    
                }
            }

        ]);

        res.status(200).json(agents);
        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })

        
    }
}



// exporting the function 
module.exports={updateUser,getUser,deleteUser,deleteSkill,addSkill,getSkill,addAgent,getAgent,getAgents,updateAgent};