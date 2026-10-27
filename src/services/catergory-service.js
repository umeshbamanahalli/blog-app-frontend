import {myAxios} from "./helpers";

export const getAllCategories=()=>{
    return myAxios.get("/categories/").then((response)=>response.data);
}

export const loadAllCategories=()=>{
return myAxios.get("/categories/").then((resp)=>resp.data);
}