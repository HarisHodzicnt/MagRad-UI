import React,{useEffect, useState, FormEventHandler, ChangeEvent} from "react";
import { Employee, Employeer, Proposal, EmployeeWorks } from "../account/types";
import { apiUser, getDataToDatabase, jobUrl, changeFirstToUpperArray, changeFirstToUpper, putFormDataToDatabase, putDataToDatabase } from "../environment/environment";
import CreateIcon from '@material-ui/icons/Create';
import StarIcon from '@material-ui/icons/Star';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Carousel from "./Carousel";
import EmployeeDialog from "./EmployeeDialog";
import SingleLineGridList from "./Gallery";
import Paper from '@material-ui/core/Paper';
import { Fab } from '@material-ui/core';
import { UserLeftProfileSection } from "./UsersLeftProfileSection";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getEmployeeWork, getEmployee } from "./MethodsProfile";
import { PaperJobs } from "./PaperJobs";

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
const ProfilePageComponent = (props:any) => {

  const classes=useStyles()

  

 
  // ovde dohvatim sve slike ... jer ne moze onako, i onda moram ici kroz ovaj niz da nadjem koja mi treba, preko imena kojeg dobijem s bekenda aha haj pokusaj ovako
  const [openDialog, setOpenDialog]=useState<boolean>(false);
  const [hover, setHover]=useState<boolean>();
  const [updateWorkExp, setUpdateWorkExp]=useState<EmployeeWorks>();
  const [data,setUserData]=useState<Employee>({
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
  const [employeers, setEmployeers]=useState<{name:string, lastName:string}[]>([]);

  useEffect(()=>{
    getEmployeeWork(props.id, props.jwt, setPreviousWork)
    
    const fetchJobDetails =async () =>
    await getDataToDatabase(`${jobUrl}overview/details/${props.id}`, props.jwt).then((y) => y.json()).then((x) =>{
      x.map(async (value: any) => {
        
        const proposal:Proposal[]=changeFirstToUpperArray<Proposal[]>(x)
        setProposals(proposal)

        value=changeFirstToUpper<Proposal>(value)

        if(value.EmployeerId)
        {
          const employeer = await fetchEmployeerById(value.EmployeerId)
          setEmployeers([...employeers, employeer])
        }
    
      })
      getEmployee(props.id, props.jwt, setUserData);
    }
     
    )

    const fetchEmployeerById = async (employeerId: string) =>
    await getDataToDatabase(`${apiUser}employeer/${employeerId}`, props.jwt).then((y) => y.json()).then((z) => ({ id:z.id, name: z.name, lastName: z.lastName }))

    fetchJobDetails();
  },[])



let proba = "https://www.elegantthemes.com/blog/wp-content/uploads/2015/02/custom-trackable-short-url-feature.png"

const handleChangeImg=async(e:ChangeEvent<HTMLInputElement>)=>{
  const form= new FormData();
  const copyData:Employee=data;
  const photoName:string=e.target.value.split("\\").pop()!;
  const extension:string=photoName?.split(".").pop()!;
  if (["jpeg", "jpg", "png", "svg"].includes(extension))
  {
    copyData.Photo=e?.currentTarget.files![0]
    copyData.PrimaryWork="Irget"
    for (const prop in copyData) {
     
      //@ts-ignore
      form.append(prop, copyData[prop]);

    }
    putFormDataToDatabase(`${apiUser}updateEmployee`, form, props).then(x=>{return x}).then(x=>{
      console.log(x);
      const employee:Employee=changeFirstToUpper<Employee>(x);  
      setUserData(employee);
     }).catch(e=>console.log)
  }
  else
  return false;
}


const handleChangeData=(e:any)=>{
  setUserData({...data, [e.target.id]: e.target.value})
}

const handleSubmitUpdate=()=>{
  putDataToDatabase(`${apiUser}updateEmployee2`, data, props.jwt).then(x=>x.json()).then(x=>{
    const employee:Employee=changeFirstToUpper<Employee>(x);  
    setUserData(employee);
    console.log(x);
   })
}
 
const handleDeleteWork=async(item:any)=>{
  getDataToDatabase(`http://localhost:52906/employeeWork/deleteEmployeeWork/${item.Id.toString()}`, props.jwt).then(x=>x.json()).then(x=>{
    getEmployeeWork(props.id, props.jwt, setPreviousWork)
   }).catch(x=>console.log(x))
  // await getDataToDatabase(`http://localhost:52906/employeeWork/${id}`, props.jwt).then((y) => y.json()).then((x) =>).catch(e=>console.log)

}
console.log(props)
  return <div>
    <div style={{display:'flex', flexWrap:'wrap'}}>

    <UserLeftProfileSection data={data} jwt={props.jwt} userType="Employee" setUserData={(data:Employee)=>{setUserData(data)}}/>


    <div className={classes.descriptionData}> 
    <p>{data.DescriptionWork} </p>
    <p style={{textAlign:'right', width:'70%'}}>{data.Payment} KM</p>
    <p style={{textAlign:'right', width:'70%'}}>Ukupna ocjena: {data.TotalMark}   <StarIcon style={{color:"#DAA520", fontSize:'3.5vmin', verticalAlign:'middle', marginTop:'-8px'}}/></p>
        <div style={{display:'flex', width:'80%', margin:'0 auto', marginTop:'7vh'}}>
             <p style={{textAlign:'left', flex:'70%', verticalAlign:'middle', margin:0}}>Dosadašnji poslovi i iskustvo: </p>  
            <Button variant="outlined" color="primary" style={{flex:'25%', maxHeight:'4vh', maxWidth:'5vw'}} onClick={()=>{setOpenDialog(true); setUpdateWorkExp(undefined)}}>
                 Unesite
            </Button>
        </div>
    
        <div>
        {
          previousWork?.map(x=>{
            console.log(x)
            let arrayImages=x.AllPathsPhotos?.split(",")
            arrayImages?.pop()
            return <div>
                        
                        
                <PaperJobs id={props.id} arrayImages={arrayImages} 
                           jwt={props.jwt} data={x} history={props.history} 
                           userType="Employee" setPreviousWork={(work:any)=>{setPreviousWork(work)}}
                           setOpenDialog={(open:any)=>{setOpenDialog(open)}}
                           setUpdateWorkExp={(updateWork:any)=>{setUpdateWorkExp(updateWork)}}/>
                {/* <Paper elevation={3}
                    style={{width:'90%', margin:'20px auto', padding:'10px', 
                    borderTop:'1px solid grey'}}>
                    <div style={{display:'flex'}}>
                        <p style={{textAlign:'left', flex:'97%', width:'70%', margin:'5px auto'}}> Naslov: {
                        x.Title}</p>
                        <Fab color="primary" aria-label="add" style={{flex:'5%', maxWidth:'50px', maxHeight:'50px'}} onClick={()=>{setOpenDialog(true); setUpdateWorkExp(x)}}>
                          <CreateIcon />
                        </Fab>
                    </div>
                    
                    <p>{
                    x.Description}</p>
                    <div style={{padding:'10px'}}>
                    {
                     arrayImages ? <SingleLineGridList images={arrayImages} title={
                      x.Title} id={props.id}/> : false
                    }
                    </div>
                    <p style={{textAlign:'right', margin:0}} onClick={()=>handleDeleteWork(x)}> 
                    <Fab aria-label="add" style={{maxWidth:'50px', background:'red', color:'white', maxHeight:'50px', margin:0}}>
                          <DeleteOutlineIcon />
                    </Fab></p>
                   
              </Paper> */}

            </div>
          })
        }
        </div>
      
      <EmployeeDialog workExp={updateWorkExp} open={openDialog} close={()=>setOpenDialog(false)} jwt={props.jwt} EmployeeId={props.id} updateWorkExp={(username:any)=>{setPreviousWork(username)}} />

  </div>
    </div>
    

    <div style={{marginTop:'10vh', marginBottom:'5vh'}}>
      <h1 style={{fontSize:'3.4vmin'}}>Iskustva naših korisnika</h1> 
     <Carousel proposals={proposals}/>
     <br/>
    </div>
  </div>
};

export default ProfilePageComponent;
