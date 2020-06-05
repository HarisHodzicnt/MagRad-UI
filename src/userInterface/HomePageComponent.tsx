import React, { useEffect, useState } from "react"
import { apiAccount, apiUser, getDataToDatabase, changeFirstToUpperArray } from "../environment/environment"
import {Employee} from '../account/types';



const HomePage = (props: any) => {
  const [data,setData]=useState<Array<Employee>>([]);

  const [fetching, setFetching]=useState<boolean>(true);
  console.log(props);
  
  
  useEffect(() => {
    console.log(props.jwt)
    const fetchUsers = async () => {
      try{
        await getDataToDatabase(`${apiUser}employee`, props.jwt).then((y) => y.json()).then(employees=>{
          const employeesCopy:Employee[]=changeFirstToUpperArray<Employee[]>(employees)
          setData(employeesCopy);setFetching(false)});
        }
      catch(error){
       props.history.push("/login")
        console.log(error);
      }
      }
     
     fetchUsers();
  },[]);

  return (<div>
    {
      fetching ? <div>Loading</div> : <div>  <h1 >Home page</h1>
      <div style={{display:'flex', flexWrap:'wrap', color:'black'}}>
      <div style={{flex:'25%', border:'2px solid black'}}><h2>Recent searches</h2></div>
      <div style={{flex:'60%',border:'2px solid black'}}>
        <h4>Find someone interesting</h4>
     
      {
         data?.map((x,index)=>{
          return (x.Name) ? <div style={{display:'flex', flexWrap:"wrap"}} key={index}>
            <img alt="bzv" src="https://www.elegantthemes.com/blog/wp-content/uploads/2015/02/custom-trackable-short-url-feature.png" style={{flex:'30%', height:'100px', width:'100px', border:"2px solid black", borderRadius:'50%'}}/>
            
          <div style={{flex:'65%', border:'2px solid black'}}  onClick={()=>{props.history.push({
            pathname:`/employee/${x.Id}`,
            state:{userId:x.Id}})}}>
                      
                    <h3>{
                    x.PrimaryWork
                    }</h3>
                    <p>{
                    x.DescriptionWork}</p>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                      <span style={{flex:'30%', border:'2px solid black'}}>{
                      x.Name}</span>
                      <span style={{flex:'30%', border:'2px solid black'}}>{
                      x.LastName}</span>
                      <span style={{flex:'30%', border:'2px solid black'}}>{
                      x.Payment}</span>
                    </div>
            </div>
           
          </div> :false
        })
      }
      </div>
  </div></div>
    
    }
    
  </div>)
}

export default HomePage
