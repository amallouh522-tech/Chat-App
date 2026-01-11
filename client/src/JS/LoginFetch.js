import axios from "axios";

export async function LoginFetch(username , password) {
    if (!username || !password) {
        return {succ : false , msg : "Please enter username and password"}
    }else{
        try {
            const Response = await axios.post("/api/login" , 
                {username , password},
            );

            const Result = Response.data;
            if (Result.succ) {
                return {succ : true, RID: Result.RID, msg: Result.msg};
            }else{
                return {succ : false , msg : Result.msg || "Error while logging in"}
            }

        } catch (error) {
            console.error(error);
            return {succ : false , msg : "Server error. Please try again"};
        };
    };
};

export async function SignUPFetch(username , password , email) {
    if (!username || !password || !email) {
        return {succ : false , msg : "Please Enter Data"};
    } else {
        try {
            const Response = await axios.post("/api/signup" , 
                {username , password , email}
            );
            const Result = Response.data;
            if (Result.succ) {
                return {succ:true}
            }else{
                return {succ : false , msg : "Please try again"}
            }
        } catch (error) {
            console.error(error);
        }
    }
}
