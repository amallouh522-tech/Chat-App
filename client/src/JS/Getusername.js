import axios from "axios";

export async function Getusername() {
    try {
        const response = await axios.post("/api/getusername", { withCredentials: true });
        if (response.data.succ) {
            return response.data.username;
        } else {
            return null;
        };
    } catch (error) {
        console.error("Error fetching username:", error);
        return null;
    };
};

