import { Proposal } from "../account/types";
export const apiAccount = "http://localhost:52906/account/"
export const apiUser = "http://localhost:52906/user/"
export const jobUrl="http://localhost:52906/jobPost/"



export const returnFirstLetterUppercase=(proposal:Proposal):Proposal=>{
  let obj={};
console.log(proposal);
 Object.entries(proposal).map(([prop,value])=>{
   console.log(prop);
   //@ts-ignore
   obj[prop.substring(0, 1).toUpperCase() + prop.substring(1)]=value;
 })
//@ts-ignore
 return obj!;
}


export const postDataToDatabase=(url:string, data:any, jwt?:string)=>{

    return fetch(url,{
  
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${jwt}`,
      },
      mode:"cors",
      body:JSON.stringify(data)
    })
  }


  export const postFormDataToDatabase=(url:string, data:any, jwt?:string)=>{

    return fetch(url,{
      method:"POST",
      headers:{
        Authorization: `Bearer ${jwt}`,
      },
      mode:"cors",
      body:data
    })
  }



  export const putFormDataToDatabase=(url:string, data:any, jwt?:string)=>{

    return fetch(url,{
  
      method:"PUT",
      headers:{
        Authorization: `Bearer ${jwt}`,
      },
      mode:"cors",
      body:data
    })
  } 


  export const putDataToDatabase=(url:string, data:any, jwt?:string)=>{

    return fetch(url,{
  
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${jwt}`,
      },
      mode:"cors",
      body:JSON.stringify(data)
    })
  } 
  
 export  const getDataToDatabase=(url:string, jwt:string)=>{
  
    return fetch(url,{
  
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${jwt}`,
      },
      mode:"cors",
    })
  }
  


  export const changeFirstToUpper=<R>(object:any):R=>{
    let ob={}
    Object.entries(object).map(([prop,value])=>{
      //@ts-ignore
     ob[prop.substring(0, 1).toUpperCase() + prop.substring(1)]=value;
    })
    //@ts-ignore
   return ob;
  }

  export const changeFirstToUpperArray=<R>(object:Array<any>):R=>{
    let arrayToReturn:Array<any>=[];
    object?.map(item=>{
      const ob={}
      Object.entries(item).map(([prop,value])=>{
        //@ts-ignore
       ob[prop.substring(0, 1).toUpperCase() + prop.substring(1)]=value;
      })
      arrayToReturn.push(ob);
    })  
    //@ts-ignore
   return arrayToReturn;
  }
