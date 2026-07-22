import {Router} from "express";
import {STATE} from "../../config/constants.js";
import StudentModel from "../../Model/StudentModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";
const router=Router();


export default router.get("/",async (req,res)=>{
    try{
        const {student_id,search}=req.query;

        let query={ isActive: STATE.ACTIVE};
        if (student_id){
            query._id=student_id;
        }
        if (search){
            query.name={$regex:search,$options:"i"};
        }
        console.log("Query:", query);
        const studentData=await StudentModel.find(query,{
            isActive:STATE.INACTIVE,
            __v:0,
        });
        if (!studentData.length){
            return send(res,setErrMsg(RESPONSE.NOT_FOUND,"Student Data"));
        }
        return send(res,RESPONSE.SUCCESS,studentData)
        
    }   catch(error){
        console.log("Student List Api",error);
        return send(res,RESPONSE.UNK_ERR)
    }
    
});
