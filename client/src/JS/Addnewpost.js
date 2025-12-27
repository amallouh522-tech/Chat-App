import axios from "axios";


export async function Addpostfetch(text, title) {
    const response = await axios.post("/api/addpost",
        { text, title },
        { withCredentials: true }
    );
    const result = await response.data;
    return result;
}


