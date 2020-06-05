import React,{useEffect, useState, FormEventHandler, ChangeEvent} from "react";
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import { apiUser, getDataToDatabase, jobUrl, changeFirstToUpper, putFormDataToDatabase } from "../environment/environment";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Employee, Employeer } from "../account/types";
import ProfileInfo from './ProfileInformations/ProfileInfo';

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
  fontSize:'2.5vmin'
 }

}),
);

export const UserLeftProfileSection=(props:any)=>{
    const classes=useStyles()
    const [hover, setHover]=useState<boolean>();
    const [updateProfile, setUpdateProfile]=useState<boolean>(false);


    const handleChangeData=(e:any)=>{
        props.setUserData({...props.data, [e.target.id]: e.target.value})
      }
      
    const getUserData=async()=>{
      await getDataToDatabase(`${apiUser}${props.userType}/${props.data.Id}`, props.jwt).then((y) => y.json()).then((x) =>{
        const user = props.userType=="Employee" ? changeFirstToUpper<Employee>(x) : changeFirstToUpper<Employeer>(x)
        props.setUserData(user)}).catch(e=>console.log)
    }

    const handleChangeImg=async(e:ChangeEvent<HTMLInputElement>)=>{
        const form= new FormData();
        //@ts-ignore
        const copyData={};

        for(const prop in props.data){    
            //@ts-ignore
            copyData[prop]=props.data[prop]
        }
        const photoName:string=e.target.value.split("\\").pop()!;
        const extension:string=photoName?.split(".").pop()!;
        if (["jpeg", "jpg", "png", "svg"].includes(extension))
        {
          //@ts-ignore
          copyData.Photo=e?.currentTarget.files![0]

          if(props.userType=="Employee")
          {
            //@ts-ignore
            copyData.PrimaryWork="Irget"
          }

          for (const prop in copyData) {
           
            //@ts-ignore
            form.append(prop, copyData[prop]);
      
          }
          console.log(props)
          putFormDataToDatabase(`${apiUser}update${props.userType}`, form, props.jwt).then(x=>x).then(async x=>{(getUserData())})

      }
    }

 return (
   <div
     style={{ flex: "30%", marginTop: "70px" }}
   >
            <div style={{ position: "relative" }}>
            <img
                alt="bzv"
                src={"http://localhost:52906/Images/" + (props.data?.PhotoPath)}
                // src={
                //     images[data.PhotoPath]}
                style={{
                height: "220px",
                maxWidth: "220px",
                width: "220px",
                border: "2px solid black",
                borderRadius: "50%",
                }}
                onMouseOut={() => setHover(false)}
                onMouseOver={() => setHover(true)}
            />
            <label htmlFor="files">
                <CreateIcon
                onMouseOver={() => setHover(true)}
                style={{
                    display: hover ? "table" : "none",
                    position: "absolute",
                    top: "48%",
                    left: "48%",
                    color: "white",
                    fontSize: "2rem",
                }}
                />
                <input
                type="file"
                id="files"
                onChange={handleChangeImg}
                style={{ display: "none" }}
                />
            </label>
            </div>

            <br />
            <div className={classes.personalData}>
            <span>{props.data?.City}</span>
            <br />
            <span>
                {props.data?.Name} {props.data?.LastName}
            </span>
            <br />
            <span>{props.data?.Phone}</span>
            <br />
             {
               props.userType=="Employeer" ? false : <span>{props.data?.PrimaryWork}</span>
             }
    
            </div>
     <br />
     <Button
       fullWidth
       variant="contained"
       color="primary"
       className={classes.submit}
       onClick={()=>setUpdateProfile(!updateProfile)}
     >
       Uredit profil
     </Button>

     <ProfileInfo data={props.data} open={updateProfile} close={()=>setUpdateProfile(!updateProfile)} userType={props.userType} jwt={props.jwt} getUserData={(getUserData)}/>

   </div>
 )
}