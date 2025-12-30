import axios from "axios";


export async function Addpostfetch(text, title, img) {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('title', title);
    if (img) {
        formData.append('img', img);
    }
    const response = await axios.post("/api/addpost",
        formData,
        { 
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    const result = await response.data;
    return result;
}


