import axios from "axios";

export async function getAllPhoneInfo(){
    const response = await axios.get(
      '/api/phoneinfo'
    );
    return response.data;
    // const data = [
    //   {
        // id:"1",
        // model_name:"model1",
        // machine_name:"모델1",
        // shipping_price:"1000000",
        // maker:"lg",
        // created:"2010-10-10",
        // battery:"",
        // screen_size:"",
        // storage:"",
    //   },
    //   {
    //     id:"2",
    //     model_name:"model2",
    //     machine_name:"모델2",
    //     shipping_price:"1234",
    //     maker:"samsung",
    //     created:"2010-10-10",
    //     battery:"",
    //     screen_size:"",
    //     storage:"",
    //   }
    // ];
    // return await data;

}

export async function patchPhoneInfo(patchData){
  console.log("patch 시작", JSON.stringify(patchData));
  const response = await axios.patch('api/phoneinfo/a',JSON.stringify(patchData),{
    headers:{
      "Content-Type": `application/json`
    }
  });
  console.log(response.data);
}