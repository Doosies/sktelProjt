import axios from "axios";

export async function getAllPhoneInfo(){
    const response = await axios.get(
      '/api/phoneinfo'
    );
    return response.data;

}