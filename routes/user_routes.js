const router = require('express').Router();
const {verifyToken,verifyAndAuth,verifuAgent}=require('../middleware/verifyToken');
const userContoller= require('../controllers/usercontroller');

//  get User Route
// /api/user/
router.get('/',verifyAndAuth,userContoller.getUser);


// delete User
// /api/user/delete
router.delete("/delete",verifyAndAuth,userContoller.deleteUser);


// update user 
// /api/user/update
router.put("/update",verifyAndAuth,userContoller.updateUser);



// add skill
// api/user/addSkill
router.post("/addSkill",verifyAndAuth,userContoller.addSkill);

// delete skill
// api/user/deleteSkill/:id
router.delete("/deleteSkill/:id",verifyAndAuth,userContoller.deleteSkill);



// get Skill
// api/user/getSkill

router.get("/getSkill",verifyAndAuth,userContoller.getSkill);


// add agent
// api/user/addAgent
router.post("/addAgent",verifyAndAuth,userContoller.addAgent);

// update agent
// api/user/updateAgent
router.put("/updateAgent/:id",verifyAndAuth,userContoller.updateAgent);

// get Agent
// api/user/getAgent
router.get("/getAgent/:uid",verifyAndAuth,userContoller.getAgent);


// get all agent
// api/user/getAgents
router.get("/getAgents",verifyAndAuth,userContoller.getAgents);






module.exports=router;