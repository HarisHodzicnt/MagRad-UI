import { getDataToDatabase, apiUser, jobUrl, changeFirstToUpperArray, changeFirstToUpper } from "../environment/environment";
import { EmployeeWorks, Employee, Proposal, Employeer, Job} from "../account/types";


export const getEmployeeWork=async(id:any, jwt:string, f:React.Dispatch<React.SetStateAction<EmployeeWorks[]>>)=>getDataToDatabase(`http://localhost:52906/employeeWork/${id}`, jwt).then((y) => y.json()).then((x) =>{
console.log(x)
const employeeWorks:EmployeeWorks[]=changeFirstToUpperArray<EmployeeWorks[]>(x);
console.log(employeeWorks)
f(employeeWorks)
}).catch(e=>console.log)


export const getEmployee=async(id:any, jwt:string, f:React.Dispatch<React.SetStateAction<Employee>>)=>{
    await getDataToDatabase(`${apiUser}employee/${id}`, jwt).then((y) => y.json()).then((x) =>
  {
    const employee:Employee=changeFirstToUpper<Employee>(x);
    f(employee);
  })
  }

export const getEmployeerJobs=async(id:any, jwt:string, f:React.Dispatch<React.SetStateAction<Job[]>>)=>{
  getDataToDatabase(`${jobUrl}jobs/${id}`, jwt).then((y) => y.json()).then(x=>{
    const jobs:Job[]=changeFirstToUpperArray<Job[]>(x);
    f(jobs)}).catch(e=>console.log)
  }
//   export const fetchJobDetails =async (id:any, jwt:string, fP:React.Dispatch<React.SetStateAction<Proposal[]>>, empr:{id:any, name:string, lastName:string}[], fER:React.Dispatch<React.SetStateAction<{id:any, name:string, lastName:string}[]>>) =>
//   await getDataToDatabase(`${jobUrl}overview/details/${id}`, jwt).then((y) => y.json()).then((x) =>{
//     x.map(async (value: any) => {
//       fP(x)
//       if(value.employeerId)
//       {
//         const employeer:{id:any, name:string, lastName:string}[]= await fetchEmployeerById(value.employeerId, jwt) 
//         fER([...empr, employeer])
//       }
  
//     })
//     getEmployee(id, jwt, fE);
//   }
//   )


  const fetchEmployeerById = async (employeerId: string, jwt:string) =>
  await getDataToDatabase(`${apiUser}employeer/${employeerId}`, jwt).then((y) => y.json()).then((z) => ({ Id:z.id, Name: z.name, LastName: z.lastName }))
