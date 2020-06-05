import React, { useState, useEffect, ChangeEvent, HtmlHTMLAttributes } from 'react'
import { Job, Proposal } from '../account/types';
import { jobUrl, postDataToDatabase, getDataToDatabase, changeFirstToUpper } from '../environment/environment';
import moment from 'moment';

const ProposalComponent=(props:any)=>{
    const [proposal, setProposal]=useState<Proposal>({
      Id:0,
      EmployeeId:props.id,
      EmployeerId:props.location.state?.employeerId,
      JobPostId:props.location.state?.jobId,
      StartDate:new Date(),
      EndDate:new Date(),
      Comment:"",
      OverView:"",
      Mark:0,
      MoneyRequire:0
    });
   
    const [job, setJob]=useState<Job>({
      Id:0, 
      Title:"",
      Description:"",
      Payment:0, 
      EmployeerId:props.location.state?.employeerId, 
      StartDate:new Date()
});


    useEffect(()=>{
      const fetchJob=async()=>{
        try{
          await getDataToDatabase(`${jobUrl}${props.location.state?.jobId}`, props.jwt).then(x => x.json()).then(job=>{
            const jobCopy:Job=changeFirstToUpper<Job>(job)
            setJob(jobCopy)
          });         
        }
        catch(error){
        //   props.history.push("/login")
          console.log(error);
        }
      }
          fetchJob();
    },[])

    const handleChangeProposal=(e: React.FormEvent<HTMLInputElement> )=>{
      setProposal({...proposal, [e.currentTarget.id]: e.currentTarget.value})
    }

    const handleSubmitProposal=async(e:React.FormEvent<HTMLButtonElement>)=>{
      try{
          await postDataToDatabase(`${jobUrl}proposal`, proposal, props.jwt).then(x => x.json()).then(jobs=>{console.log(jobs)});         
        }
      catch(error){
        props.history.push("/login")
        console.log(error);
      }
    }
    console.log(proposal)
    return (
      <div>
        <div style={{display:'flex'}}>
          <div style={{flex:'50%'}}>
            <p>
              {
                job.Title
              }
            </p>
            <p>
              {
                job.Description
              }
            </p>
            <p>
              {
                job.Payment
              }
            </p>
            <p>
              {moment(
                job.StartDate
              ).format("MM-DD-YYYY")}
            </p>
          </div>

          <div style={{flex:'50%'}}>
            <div>
            <label>Unesite komentar</label>
            <input
              id="Comment"
              value={proposal.Comment}
              placeholder="Describe why should he pick you"
              onChange={handleChangeProposal}
            />
            </div>
            <div>
            <label>Za koliko novca cete uraditi</label>
            <input
              id="MoneyRequire"
              value={proposal.MoneyRequire}
              placeholder="Za koliko novca ćete vi ovo uraditi"
              onChange={handleChangeProposal}
            />
            </div>
          <button onClick={handleSubmitProposal}>prijavi se</button>
          </div>
        </div>
      </div>
    )
}

export default ProposalComponent;