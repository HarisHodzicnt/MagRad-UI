import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { Fab } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import SingleLineGridList from "./Gallery";
import { EmployeeWorks } from '../account/types';
import { getDataToDatabase } from '../environment/environment';
import { getEmployeeWork, getEmployeerJobs } from './MethodsProfile';

export const PaperJobs=(props:any)=>{
    const [openDialog, setOpenDialog]=useState<boolean>(false);
    const [updateWorkExp, setUpdateWorkExp]=useState<EmployeeWorks>();
    const [previousWork, setPreviousWork]=React.useState<EmployeeWorks[]>([]);

    const handleDeleteWork=async(item:any)=>{
        const url = props.userType == "Employeer" ? `http://localhost:52906/jobPost/delete/${item.Id}` : `http://localhost:52906/employeeWork/deleteEmployeeWork/${item.Id.toString()}`
        getDataToDatabase(url, props.jwt).then(x=>x.json()).then(x=>{ 
            props.userType == "Employeer" ? getEmployeerJobs(props.id, props.jwt, props.setJobs) :  getEmployeeWork(props.id, props.jwt, props.setPreviousWork)
         }).catch(x=>console.log(x))
      
      }

    return ( props.data? 
      <Paper
        elevation={3}
        style={{
          width: "90%",
          margin: "20px auto",
          padding: "10px",
          borderTop: "1px solid grey",
        }}
      >
        <div style={{ display: "flex" }}>
          <p
            style={{
              textAlign: "left",
              flex: "97%",
              width: "70%",
              margin: "5px auto",
            }}
          >
            {" "}
            Naslov: {props.data.Title}
          </p>
          <Fab
            color="primary"
            aria-label="add"
            style={{ flex: "5%", maxWidth: "50px", maxHeight: "50px", minWidth:'50px' }}
            onClick={() => {
              props.setOpenDialog(true)
              props.setUpdateWorkExp(props.data)
            }}
          >
            <CreateIcon />
          </Fab>
        </div>

        <p>{props.data.Description}</p>
        {
            props.userType=="Employeer" ? <div>
                <p>{props.data.Payment} KM</p> 
                <button onClick={()=>{                  
                 props.history.push({pathname:`/job/details/`+props.data.Id, state:{jobId:props.data.Id}})}}>više</button>
                </div>: false
        }
       
       
        <div style={{ padding: "10px" }}>
          {props.arrayImages ? (
            <SingleLineGridList
              images={props.arrayImages}
              title={props.data.Title}
              id={props.id}
            />
          ) : (
            false
          )}
        </div>
        <p
          style={{ textAlign: "right", margin: 0 }}
          onClick={() => handleDeleteWork(props.data)}
        >
          <Fab
            aria-label="add"
            style={{
              maxWidth: "50px",
              background: "red",
              color: "white",
              maxHeight: "50px",
              margin: 0,
            }}
          >
            <DeleteOutlineIcon />
          </Fab>
        </p>
      </Paper> : <p></p>
    )
}