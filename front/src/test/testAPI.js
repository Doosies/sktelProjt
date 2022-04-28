import axios from "axios";

export async function select(){
    const response = await axios.get(
      '/api/select'
    );
    return response.data;
}
