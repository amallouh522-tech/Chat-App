import axios from "axios";
export async function AddLikeFetch(ID) {
    const response = await axios.post("/api/addlike",
        { ID },
        { withCredentials: true }
    );
    return response.data.succ === true;
}