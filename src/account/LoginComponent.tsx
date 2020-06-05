import React, { useEffect, useState } from "react"
import { Login } from "./types"
import { postDataToDatabase } from "../environment/environment"
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

function LoginComponent(props: any) {

  
  const classes = useStyles();


  const [data, setData] = useState<Login>({
    Email: props.loginData?.Email ||  "",
    Password: props.loginData?.Password || "",
    RememberMe: props.loginData?.RememberMe || false
  })

  const labels = {
    Email: "Email",
    Password: "Password",
    RememberMe: "remember me"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   e.currentTarget.checked ? setData({ ...data, [e.currentTarget.id]: e.currentTarget.checked }) : setData({ ...data, [e.currentTarget.id]: e.currentTarget.value })  
  }

  const handleSubmit = async (e:any) => {
    await postDataToDatabase(`http://localhost:52906/account/login`, data).then(x=>x.json()).then(y => {
      localStorage.setItem("jwt", y.token) 
      localStorage.setItem("userId", y.data)
      localStorage.setItem("role", y.role)
      props.changeJwt(y.token)
      console.log(localStorage)
      if(data.RememberMe)
      localStorage.setItem("loginData", JSON.stringify(data)) 
      else
      localStorage.removeItem("loginData")

      props.history.push("/home")
    })

  }
  return (
    <div  style={{ display:'flex', width:'100%'}}>
    <CssBaseline />
    <div className={classes.logoSection}>   
       <img src="/logo.png" alt="logo" style={{margin:'0 auto', height:'220px', width:'360px',}}/>
    </div>

    <div className={classes.paper} >
      <Avatar className={classes.avatar} >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" >
        Sign in
      </Typography>

      <SocialMedia/>
      <p style={{margin:'10px 0 0 0'}}>ili</p>
      <form className={classes.form} noValidate>
        
      {Object.getOwnPropertyNames(data).map((property) => {
        return (
          <div>

            {property === "RememberMe" ? (
              <FormControlLabel  style={{color:'blue'}} 
                control={<Checkbox  id={property} checked={data[property]}onChange={handleChange}/>}
                label="Remember me"
             />
            ) : (
              <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id={property}
              label={labels[property as keyof Login]}
              name={labels[property as keyof Login]}
              onChange={handleChange}
              placeholder={labels[property as keyof Login]}
         
            />
            )}
          </div>
        )
      })}

        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
    </div>
  </div>
  )
}

export default LoginComponent
