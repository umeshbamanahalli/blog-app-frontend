import {myAxios} from "./helpers";

export const signUp=(user)=>{
    return myAxios.post("/auth/register",user).then((response)=>response.data);
};

export const loginUser=(loginDetails)=>{
    return myAxios.post("/auth/login",loginDetails).then((response)=>response.data);
}