import React,{useEffect, useState, FormEventHandler, ChangeEvent} from "react";
import { Employee, Employeer, Proposal, EmployeeWorks } from "../account/types";
import { apiUser, getDataToDatabase, jobUrl, changeFirstToUpper, changeFirstToUpperArray } from "../environment/environment";
import CreateIcon from '@material-ui/icons/Create';
import StarIcon from '@material-ui/icons/Star';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Carousel from "./Carousel";
import EmployeeDialog from "./EmployeeDialog";
import SingleLineGridList from "./Gallery";
import Paper from '@material-ui/core/Paper';
import { Fab } from '@material-ui/core';

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
    color:'white',
    fontSize:'1.5vmin',
    '&:hover':{
      color:'blue'
    }
  },
 personalData:{
   fontSize:'3.5vmin',
 },
 descriptionData:{
  flex:'65%', marginTop:'90px',
  fontSize:'2.5vmin'
 }

}),
);
const EmployeeComponent = (props:any) => {

  const classes=useStyles()

  

 
  // ovde dohvatim sve slike ... jer ne moze onako, i onda moram ici kroz ovaj niz da nadjem koja mi treba, preko imena kojeg dobijem s bekenda aha haj pokusaj ovako
  
  const [data,setData]=useState<Employee>({
    Id:"",
    Name:"",
    LastName:"",
    Phone:"",
    PrimaryWork:"",
    Payment:"",
    DescriptionWork:"",
    City:"",
    Email:"",
    PhotoGallery:"",
    PhotoPath:"",
    TotalMark:0
  });

  const [previousWork, setPreviousWork]=React.useState<EmployeeWorks[]>([]);
  const [proposals, setProposals]=useState<Proposal[]>();
  const [employeers, setEmployeers]=useState<{Id:any, Name:string, LastName:string}[]>([]);

  useEffect(()=>{
    getDataToDatabase(`http://localhost:52906/employeeWork/${props.location.state.userId}`, props.jwt).then((y) => y.json()).then((x) =>{
    const work:EmployeeWorks[]=changeFirstToUpperArray<EmployeeWorks[]>(x)  
    setPreviousWork(work)}).catch(e=>console.log)


    const getEmployee=async()=>{
      await getDataToDatabase(`${apiUser}employee/${props.location.state.userId}`, props.jwt).then((y) => y.json()).then((x) =>
    {
      const employee:Employee=changeFirstToUpper<Employee>(x)
      setData(employee);
    })
    }

    const fetchJobDetails =async () =>
    await getDataToDatabase(`${jobUrl}overview/details/${props.id}`, props.jwt).then((y) => y.json()).then((x) =>{
      x.map(async (value: any) => {
        const proposal:Proposal[]=changeFirstToUpperArray<Proposal[]>(x)
        setProposals(proposal)

        if(value.employeerId)
        {
          const employeer = await fetchEmployeesById(value.employeerId)
          setEmployeers([...employeers, employeer])
        }
    
      })
      getEmployee();
    }
     
    )

    const fetchEmployeesById = async (employeerId: string) =>
    await getDataToDatabase(`${apiUser}employeer/${employeerId}`, props.jwt).then((y) => y.json()).then((z) => ({ Id:z.id, Name: z.name, LastName: z.lastName }))

    fetchJobDetails();
  },[])



  return <div>
    <div style={{display:'flex'}}>

    <div style={{flex:'30%', borderRight:'2px solid black',marginTop:'70px'}}>
        <div style={{position:'relative'}}>
        <img alt="bzv" src={"http://localhost:52906/Images/"+data?.PhotoPath}
   
            style={{height:'220px', maxWidth:'220px', width:'220px', border:"2px solid black", borderRadius:'50%'}}

        />
        </div>  
      
        <br/>
        <div className={classes.personalData}>
          <span>{data.City}</span>
          <br/>
          <span>{data.Name} {data.LastName}</span>
          <br/>
          <span>{data.Phone}</span>
          <br/>
          <span>{data.PrimaryWork}</span>
        </div>
         <br/>
         <Button
            fullWidth
            variant="contained"
            style={{background:'green'}}
            className={classes.submit}
          >
            Pošalji poruku
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{marginLeft:'10px'}}
            className={classes.submit}
          >
           Follow
          </Button>
        </div>
       
    <div className={classes.descriptionData}> 
    
    <p>{data.DescriptionWork} </p>
    <p style={{textAlign:'right', width:'70%'}}>{data.Payment} KM</p>
    <p style={{textAlign:'right', width:'70%'}}>Ukupna ocjena: {data.TotalMark}   <StarIcon style={{color:"#DAA520", fontSize:'3.5vmin', verticalAlign:'middle', marginTop:'-8px'}}/></p>
        <div style={{display:'flex', width:'80%', margin:'0 auto', marginTop:'7vh'}}>
             <p style={{textAlign:'left', flex:'70%', verticalAlign:'middle', margin:0}}>Dosadašnji poslovi i iskustvo: </p>  
        </div>
    
        <div>
        {
          previousWork?.map(x=>{
            let arrayImages=x.AllPathsPhotos?.split(",")
            arrayImages?.pop()
            return <Paper elevation={3}
                    style={{width:'90%', margin:'20px auto', padding:'10px',
                    borderTop:'1px solid grey'}}>
                    <div style={{display:'flex'}}>
                        <p style={{textAlign:'left', flex:'97%', width:'70%', margin:'5px auto'}}> Naslov: {
                        x.Title}</p>
                    </div>
                    
                    <p>{
                    x.Description}</p>
                    <div style={{padding:'10px'}}>
                    {
                     arrayImages ? <SingleLineGridList images={arrayImages} title={
                      x.Title} id={props.Id}/> : false
                    }
                    </div>
                   
              </Paper>
          })
        }
        </div>
  </div>
    </div>
    

    <div style={{marginTop:'10vh', marginBottom:'5vh'}}>
      <h1 style={{fontSize:'3.4vmin'}}>Iskustva naših korisnika</h1> 
     <Carousel proposals={proposals}/>
     <br/>
    </div>
  </div>
};

export default EmployeeComponent;
