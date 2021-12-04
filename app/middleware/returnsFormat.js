const statusNo={
    SUCCEED:1,
    ERROR:0,
    TOKENERROR:3 // token失效
}

module.exports={
    succeed:(data)=>{
        return {
            status:statusNo.SUCCEED,
            data:data
        }
    },
    error:(err)=>{
        return {
            status:statusNo.ERROR,
            error:err
        }
    }
}