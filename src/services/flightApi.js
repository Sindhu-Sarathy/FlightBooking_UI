import axios from "axios";
const BASE_URL="http://localhost:8082/api/flights/ai";

export const sendMessage= async(sessionId,message)=>{
    try{
        const response=await axios.get(BASE_URL,{
            params:{sessionId,message },
        });
        return response.data;
    }
    catch(err){
        console.error(err);
    }
}