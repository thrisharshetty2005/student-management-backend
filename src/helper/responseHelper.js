export const send=(res,response,data={})=>{
    return res.send({
        responseCode:response.code,
        responseMessage:response.message,
        responseData:data,
    });
};

export const setErrMsg=(response,param)=>{
    return{
        code:response.code,
        message:`${paran}${response.message}`,
    };
};