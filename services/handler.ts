



async function handler(event:any, context:any){
    return{
        statusCode : 200,
        body : "Handler body"
    }
}


export{ handler }