import React, { useState, useEffect, ChangeEvent, FormEventHandler } from "react"
import {Proposal, Job } from "../account/types";
import { jobUrl, apiUser, getDataToDatabase, putDataToDatabase, returnFirstLetterUppercase, changeFirstToUpper, changeFirstToUpperArray } from "../environment/environment";
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import ProposalResponse from "./JobReviewPop";

const JobDetails = (props:any) => {
  const [proposals, setProposal]=useState<Proposal[]>([]);
  const [employees, setEmployees]=useState<{Id:any, Name:string, LastName:string}[]>([]);
  const [job, setJob]=useState<Job>();
  const [openModal, setOpenModal]=useState<boolean>(false);
  const [error, setError]=useState<string>();
  const [updateProposal, setUpdateProposal]=useState<Proposal>();
  const [userWorker, setUserWorker]=useState<{Name:string, LastName:string}>();
  useEffect(() => {

    const fetchProposalDetails =async () =>
    await getDataToDatabase(`${jobUrl}proposal/details/${props.location.state.jobId}`, props.jwt).then((y) => y.json()).then(async (x) =>
    {
      const proposals:Proposal[]=changeFirstToUpperArray<Proposal[]>(x);
      setProposal(proposals)
      Promise.all(proposals.map(async proposal=>
        {
          const employee = await fetchEmployeesById(proposal.EmployeeId)
          setEmployees([...employees, employee])
        })) 
    })

    const fetchJobDetails =async () =>
    await getDataToDatabase(`${jobUrl}${props.location.state.jobId}`, props.jwt).then((y) => y.json()).then(async (x) =>
    {
      const job:Job=changeFirstToUpper<Job>(x);
      setJob(job)
    }).catch(x=>setError(x.message));

    const fetchEmployeesById = async (employeeId: string) =>
    await getDataToDatabase(`${apiUser}employee/${employeeId}`, props.jwt).then((y) => y.json()).then((z) => ({ Id:z.id, Name: z.name, LastName: z.lastName }))

    fetchProposalDetails()
    fetchJobDetails()
  }, [])

 const updateProposalFunc=(e:ChangeEvent<HTMLInputElement>, proposalId:any)=>{
            //@ts-ignore
     console.log(e.target.attributes[8])
         //@ts-ignore
         if(e.target.attributes[2].value=="slider")
       {
       e.target.id="Mark";
        //@ts-ignore
         e.target.value=parseInt(e.target.attributes[8].value);
      }

    let newArr:Proposal[] = [...proposals]; 
    let index=proposals?.findIndex(x=>x.Id==proposalId);
    if(index!=undefined)
    {
      //@ts-ignore
      newArr[index][e.target.id] = e.target.value; 
    }
    setProposal(newArr); //
 }
  

 const submitUpdate= async (proposal:Proposal)=>{
  let copyProposalData:Proposal=returnFirstLetterUppercase(proposal);
   await putDataToDatabase(`${jobUrl}proposal/update`, copyProposalData, props.jwt)
    .then((y) => y.json())
    .then((z) =>setOpenModal(!openModal))
 }
   return <div style={{ width:'70%', margin:'0 auto'}}>
               <h2>List of all proposals sent for {job?.Title} </h2>
      {
        proposals?.map(proposal=>{
          let user=employees.find(x=>x.Id==proposal.EmployeeId) || {Name:'', LastName:''};
          {
             return proposal.EmployeeId ?  <div style={{border:'2px solid black', position:'relative', padding:'20px'}} >
          <p style={{textAlign:'left', width:'80%', margin:'5px auto', fontSize:'2vmin'}}> Prijava, korisnika: {user.Name} {user.LastName}</p>
          <p><span>{
         employees?.find(x=>x.Id===proposal?.EmployeerId)?.Name}</span>
         <span>{
         employees?.find(x=>x.Id===proposal?.EmployeerId)?.LastName}</span>
         </p><p style={{fontSize:'1.7vmin'}}>{
         proposal?.Comment}</p>
         <p style={{textAlign:'right', width:'50%',fontSize:'1.8vmin', margin:'0 auto'}}>Novac: {
         proposal?.MoneyRequire}KM</p>
        {
          proposal.Status!=="zavrseno" ? <Button onClick={()=>{setUpdateProposal(proposal); setOpenModal(!openModal); setUserWorker(user)}}>Ocijenite</Button> : <Button>Uposlite</Button>
        }
        {
           proposal?.OverView ? false : <span style={{height:'20px', width:'20px', background:'yellow', position:'absolute', top:'5px', left:'10px'}}></span> 
         }
         {
           proposal?.OverView ? <div style={{marginTop:'5px'}}>
              <p style={{textAlign:'left', width:'80%', margin:'5px auto', fontSize:'2vmin'}}>Your response: </p>
             <span style={{height:'20px', width:'20px', background:'green', top:'5px', right:'20px', position:'absolute', }}></span> 
             <span style={{ top:'25px', right:'10px', position:'absolute'}}>status</span> 
            <p style={{fontSize:'1.7vmin'}}>{
            proposal?.OverView}</p>
             <p style={{textAlign:'right', width:'50%',fontSize:'1.8vmin', margin:'0 auto'}}>
              {
            proposal?.Mark}<StarIcon style={{color:"#DAA520", verticalAlign:'middle', marginTop:'-5px', marginLeft:'5px'}}/></p>
                </div> : false 
         }
         
         
             </div> : <h3>Nemate prijava za navedeni posao</h3>
           }
        })
      }

      <ProposalResponse updateProposalFunc={(e:any)=>updateProposalFunc(e, updateProposal?.Id)} open={openModal} close={()=>setOpenModal(!openModal)} user ={userWorker} proposal={updateProposal} submitUpdate={(som:any)=>submitUpdate(som)}/>             
        </div>
}

export default JobDetails
