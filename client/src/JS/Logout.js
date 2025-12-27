import axios from "axios";

export async function LogoutFetch() {
    const Response = await axios.post("/api/logout" , 
        {},
        {withCredentials:true}
    );
    return Response.data.succ === true;
}