import React, { useEffect, useState } from "react"
// import axios from "axios"
import { Registration } from "./types"
import { apiAccount, postDataToDatabase } from "../environment/environment"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SocialMedia } from "../commonComponents/SocialNetwork";




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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '70%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logoSection:{
    flex:'40%', 
    marginTop: theme.spacing(37)
  },
  formSection:{
    flex:'40%',
    textAlign:'center'
  }

}),
);

function RegisterComponent(props: any) {

  const classes = useStyles();

  const [data, setData] = useState<Registration>({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    City: "",
    UserRoleApp: "select"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.currentTarget.id]: e.currentTarget.value })
  }


  const handleSubmit =async () => {
    console.log(data)
    await postDataToDatabase(`${apiAccount}registration`, data).then(x=>x.json()).then(y => {
      props.history.push({
        pathname:`/${y.activity.toLowerCase()}`,
        state:{id:y.id, jwt:y.token}}
        )
      })
  }  

 
  const labels = {
    Email: "Email",
    Password: "Password",
    ConfirmPassword: "Confirm password",
    UserRoleApp: "Your activity",
    City: "City"
  }
  return (
<div  style={{minHeight:'90vh', display:'flex', width:'100%'}}>
    <CssBaseline />
    <div className={classes.logoSection}>   
       <img src="/logo.svg" alt="logo" style={{margin:'0 auto', height:'220px', width:'360px',}}/>
    </div>

    <div className={classes.paper} >
   
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" >
        Sign up
      </Typography>
      <SocialMedia/>
      <p style={{margin:'10px 0 0 0'}}>ili</p>
      <form className={classes.form} noValidate>
        
      {Object.getOwnPropertyNames(data).map((property)=> {
       return (
          <div style={{textAlign:'left'}}>
            {
            property === "UserRoleApp" ? (
               <TextField
               style={{marginTop:'2px'}}
               id={property}                               
               select
               label={data[property]}
               value={data[property]}
               onChange={handleChange}
               SelectProps={{
                 native: true,
               }}
               helperText="Please select your currency"
               variant="outlined"
             >
                 <option>Aktivnost</option>
                 <option value="0">Employeer</option>
                 <option value="1">Employee</option>
              </TextField>
            ) : (
              <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id={property}
              label={labels[property as keyof Registration]}
              name={labels[property as keyof Registration]}
              onChange={handleChange}
              placeholder={labels[property as keyof Registration]}
         
            />
            )}
          </div>
        )
      })}

        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
           
            <Grid item xs={12} md={12} lg>
              <Link href="/login" variant="body2">
                {"You have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
          <br/>
        </form>
    </div>
  </div>

  )
}

export default RegisterComponent
