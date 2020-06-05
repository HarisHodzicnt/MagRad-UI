import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    images: {
        width:'35px', 
        height:'35px', 
        flex:'30%',
      '&:hover': {
        cursor:'pointer'
      },
    },
  }),
);
export const SocialMedia=()=>{
    const classes=useStyles()
    return <div style={{display:'flex', flexWrap:'wrap', color:'blue', width:'70%', marginTop:'3rem'}}>
                    <img src="/google.svg" className={classes.images}/>
                    <img src="/facebook.svg" className={classes.images} style={{marginLeft:'10px'}}/>
                    <img src="/linkedin.svg" className={classes.images} style={{marginLeft:'10px'}}/>

      
           </div>
}