import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getDataToDatabase, apiAccount } from '../environment/environment';
import BorderColorIcon from '@material-ui/icons/BorderColor';


const useStyles = makeStyles((theme) => ({
  root: {
    position:"fixed",
    top:0,  
    width:'100%',
    zIndex:10
  },
  header: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
    backgroundColor:"#e3f2fd"

  },
  menu_first:{
      flex:'60%',
      textAlign:'left'
  },
  button:{
      marginLeft:'20px',
      background:'#6FC7CB'

  },
  menu_second:{
      display:'flex',
      textAlign:'right', 
      flex:'auto'
  },
  menu_second_item:{
    '&:hover':{
      cursor:'pointer'
    },
    textAlign:'center',
      flex:'40%'
  }
}));

export default function Header(props:any) {
  const classes = useStyles();
  const [whichJwt, setBla]=useState();
  console.log(whichJwt)
  console.log(props.jwt)
  const url=window.location.href.split("/").pop();

//   const renderButtons=()=>{
//       const createButton=(text:string)=>{
//           return <Button variant="contained" color="primary" disableElevation className={classes.button}>
//                     {text}
//                  </Button>
//       }
//       switch(url){
//           case "":
//           case "employee":
//           case "employeer":
//           case "login" || "register":
//           case "home"
//       }
//   }

const handleActivity=async (e:any)=>{

  const logout=async ()=>{
    console.log("dodje li ovde")
    await getDataToDatabase(`${apiAccount}logout`, props.jwt).then((y) => y.json())
    .then(y =>{
      localStorage.clear()
      props.changeJwt(null)
      //@ts-ignore
      setBla(null);
      console.log(localStorage)
      props.history.push("/login")
    })
  }
  switch(e.currentTarget.id){
    case "logout":logout(); break
    case "login": props.history.push("/login"); break
    case "register":props.history.push("register"); break
  }  
}


const options_to_display=(jwt:any)=>{
  console.log(jwt);
  if(jwt)
  {
    //switch(role)// moraš ovo napravit da prikazuje po rolama gore buttone
    return  <div className={classes.menu_second_item} onClick={handleActivity} id="logout">
              <ExitToAppIcon style={{color:'#6FC7CB', fontSize:'3vmin', verticalAlign:'middle', marginRight:'5px'}}/>
              <Typography variant="h5" color="textPrimary" display="inline" >Logout</Typography>
            </div>
  }

  return <div className={classes.menu_second} >
          <div id="login" className={classes.menu_second_item} onClick={handleActivity} style={{textAlign:'right'}}>
            <ExitToAppIcon style={{color:'#6FC7CB', fontSize:'3vmin', verticalAlign:'middle', marginRight:'5px'}}/>
            <Typography variant="h5" color="textPrimary" display="inline" >Sign In</Typography>
          </div>
          <div id="register" className={classes.menu_second_item} onClick={handleActivity} style={{ marginLeft:'20px'}}>
            <BorderColorIcon style={{color:'#6FC7CB', fontSize:'3vmin', verticalAlign:'middle', marginRight:'5px'}}/>
            <Typography variant="h5" color="textPrimary" display="inline" >Sign up</Typography>
          </div>
        </div>
  
} 


  return (
    <div className={classes.root}>
      <CssBaseline />
      <header className={classes.header}>
        <section  style={{display:'flex'}}>
            <div className={classes.menu_first}>
               
                <Button variant="contained" color="primary" disableElevation className={classes.button} onClick={()=>{props.history.push("/home")}}>
                    Home
                </Button>
                <Button variant="contained" color="primary" disableElevation className={classes.button} onClick={()=>{props.history.push("/jobList")}}>
                    Jobs
                </Button>
                <Button variant="contained" color="primary" disableElevation className={classes.button} onClick={()=>{props.history.push("/employee")}}>
                    Employee
                </Button>
                <Button variant="contained" color="primary" disableElevation className={classes.button} onClick={()=>{props.history.push("/employeer")}}>
                    Employeer
                </Button>
                
            </div>
           
            {options_to_display(whichJwt || props.jwt)}
        </section>
      </header>
    </div>
  );
}