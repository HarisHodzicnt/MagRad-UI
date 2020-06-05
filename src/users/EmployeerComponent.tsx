import React, { useState, useEffect } from "react"
import { Employeer, Job } from "../account/types";
import { apiUser, jobUrl, getDataToDatabase, changeFirstToUpper, changeFirstToUpperArray } from "../environment/environment";
import JobPost from "../jobs/JobPost";
import { UserLeftProfileSection } from "./UsersLeftProfileSection";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { PaperJobs } from "./PaperJobs";
import { getEmployeerJobs } from "./MethodsProfile";

const useStyles = makeStyles((theme: Theme) =>
createStyles({  
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex:'auto',
    marginRight:theme.spacing(35)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width:'40%',
    fontSize:'1.5vmin'
  },
 personalData:{
   fontSize:'3.5vmin',
 },
 descriptionData:{
  flex:'65%', marginTop:'90px',
  fontSize:'2.5vmin',
  borderLeft:'2px solid black'
 }

}),
);

const EmployeerComponent = (props:any) => {
  const [personalData, setPersonalData]=useState<Employeer>();
  const [jobs, setJobs]=useState<Job[]>([]);
  const classes=useStyles()
  useEffect(()=>{
      getUserData();
      getEmployeerJobs(props.id, props.jwt, setJobs)
  },[])

  const getUserData=async()=>{
    getDataToDatabase(`${apiUser}employeer/${props.id}`, props.jwt).then((y) => y.json()).then(x=>{
      const employeer:Employeer=changeFirstToUpper<Employeer>(x);
      setPersonalData(employeer)
    }).catch(e=>console.log)
  }

  return <div style={{display:'flex', flexWrap:'wrap'}}>
    <div style={{flex: "30%"}}>
    <UserLeftProfileSection  data={personalData} jwt={props.jwt} userType="Employeer" setUserData={(personalData:Employeer)=>{setPersonalData(personalData)}}/>
    <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{props.history.push({pathname:'/jobPost',state:{jwt:props.jwt}})}}
          >
           Objavi posao
    </Button>
    </div>
   
    <div className={classes.descriptionData}>
    <h3 style={{textAlign:'left', width:'80%', margin:'0 auto'}}>Objavljeni poslovi:  </h3>
    {
      jobs?.map(job=>{
        // let arrayImages=job.AllPathsPhotos?.split(",") // DODAJ U BAZU SLIKE ZA POSAO KOJI POSLODAVAC OBJAVI
        return (
        <div>
          <PaperJobs id={props.id} jwt={props.jwt} data={job} history={props.history} userType="Employeer" setJobs={(jobs:any)=>{setJobs(jobs)}}/>
        </div>
        )
      })

    }


    </div>
   
  </div>
}

export default EmployeerComponent
