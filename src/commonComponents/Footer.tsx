import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" display="inline" color="textPrimary" >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Objavi.Ba
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width:'100%',
    top:20
  },
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
    backgroundColor:"#e3f2fd",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <section style={{display:'flex'}}>
          <div style={{flex:'65%', textAlign:'left'}}>
              <img style={{verticalAlign:'middle', width:'50px', height:'50px'}} src="/logo.png" alt="logo"/> 
              <Typography variant="body2" color="textPrimary" display="inline"> | olakšava pronalazak</Typography>
          </div>
          <div style={{flex:'auto', marginTop:'8px'}}><Copyright/></div>
        </section>
      </footer>
    </div>
  );
}