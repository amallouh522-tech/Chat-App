import axios from "axios";

export async function AddLikeFetch(ID) {
  try {
    const res = await axios.post(
      "/api/addlike",
      { ID },
      { withCredentials: true } // 🔥 هذا المهم
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}