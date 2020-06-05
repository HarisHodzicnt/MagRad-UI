import { apiAccount, apiUser } from "../environment/environment"

export const get = async (url:string, jwt:string) => {
    
    await fetch(`${apiUser}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         "Authorization":`Bearer ${jwt}`
      },
      mode: "cors"
    })
      .then(x => {
        return x.json()
      }).then(employee=>employee);
 }