import axios from "axios";

export async function MustLogin() {
    const Response = await axios.post("/api/mustlogin" , 
        {},
        {withCredentials:true}
    );
    return Response.data.Islogin === true;
}


