import axios from "axios";

export async function getAllPhoneInfo(){
    const response = await axios.get(
      '/api/phoneinfo'
    );
    return response.data;
}

export async function patchPhoneInfo(patchData){
  console.log("patch 시작", JSON.stringify(patchData));
  const response = await axios.patch('api/phoneinfo/a',JSON.stringify(patchData),{
    headers:{
      "Content-Type": `application/json`
    }
  });
  return response.data;
}