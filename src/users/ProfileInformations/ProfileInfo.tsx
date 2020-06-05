import React, { useEffect, ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { postDataToDatabase, putDataToDatabase, getDataToDatabase, postFormDataToDatabase, putFormDataToDatabase, changeFirstToUpperArray } from '../../environment/environment';
import { User, Employee } from '../../account/types';



const useStyles = makeStyles((theme: Theme) =>
createStyles({  

    inputfile:{
        fontSize: '2vmin',
        fontWeight: 700,
        color: 'white',
        padding:'3px 7px 3px 7px',
        backgroundColor: 'green',
        display: 'inline-block',
        borderRadius: '5px 25px',
        transition:'1.4s ease',
        marginTop:'20px',

        '&:focus':{

        },
        '&:hover':{
            backgroundColor: 'blue',
            cursor:'pointer',
            transform:'scale(1.2)',
        }
    },
    hover:{
      transition:'1.3 ease-all',
      border: '1px solid transparent',
      '&:hover':{
        borderTop: '1px solid green',
        cursor:'pointer',
        transform:'scale(1.1)',
    }
    }

})
);


export default function ProfileInfoDialog(props:any) {


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [data, setData]=useState<Employee>();
  const classes = useStyles()


  const handleChange=(e:any)=>{
                //@ts-ignore
        setData({...data, [e.currentTarget.id]: e.currentTarget.value})
  }

  

  const handleSubmit=async()=>{
      const url=props.userType == "Employee"? `http://localhost:52906/user/updateEmployee2` : `http://localhost:52906/user/updateEmployeer`;
      for (const key in props.data) {
          //@ts-ignore
        if(data!=undefined)
        {
        if (!data.hasOwnProperty(key)) {
                      //@ts-ignore
                data[key]=props.data[key]            
            }
        }      
      }
      if(data!=undefined)
      {
        data.Id=props.data.Id;
        data.City=props.data.City;
       await putDataToDatabase(url, data, props.jwt).then(x=>x).then(async x=>{props.close();await props.getPersonalData();}).catch(e=>console.log)
      }
 

  }

//   const handleUpdate=async()=>{
//     const data:EmployeeWorks={Id:props.workExp.Id, EmployeeeId:props.EmployeeId, Title:props.workExp.Title, Description:props.workExp.Description, AllPathsPhotos:props.workExp.AllPathsPhotos};
//     for (const prop in work) {
//         //@ts-ignore
//       if(work[prop]!=undefined && work[prop]!="")
//       {
//         //@ts-ignore
//         data[prop]=work[prop]
//       }
    
//     }
//   }

  
  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={()=>props.close()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Vaši podaci</DialogTitle>
        <DialogContent>
        <form>    
        <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id="Name"
              value={data?.Name || props.data?.Name}
              label="Ime"
              name="Ime"
              onChange={handleChange}
              placeholder="Unesite vaše ime"
         
            />
           <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id="LastName"
              label="Prezime"
              name="Prezime"
              value={data?.LastName || props.data?.LastName}
              onChange={handleChange}
              placeholder="Vaše prezime"
            />
      
            {
                props.userType=="Employee" ? <div>
                         <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                color="primary"
                                fullWidth
                                id="PrimaryWork"
                                label="Vaše zanimanje"
                                name="Zanimanje"
                                value={data?.PrimaryWork || props.data?.PrimaryWork}
                                onChange={handleChange}
                                placeholder="Unesite Vaše zanimanje"
                                />
                        <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                color="primary"
                                fullWidth
                                id="DescriptionWork"
                                label="Opišite čime se bavite"
                                name="OpisPosla"
                                value={data?.DescriptionWork || props.data?.DescriptionWork}
                                onChange={handleChange}
                                placeholder="Bavim se ovim poslom dugi niz godina ...."
                                />
                    <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                color="primary"
                                fullWidth
                                id="Payment"
                                label="Vaša satnica"
                                name="Satnica"
                                value={data?.DescriptionWork || props.data?.DescriptionWork}
                                onChange={handleChange}
                                placeholder="Unesite prosječnu satnicu koju naplatite za vaš rad."
                                />
                </div> : false
            }
            
               <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id="Phone"
              label="Broj telefona"
              name="Broj telefona"
              value={data?.Phone || props.data?.Phone }
              onChange={handleChange}
              placeholder="Vaš broj telefona"
            />
        </form>
        </DialogContent>
        <div style={{display:'flex', marginTop:'15px'}}>
        <DialogActions style={{justifyContent:'start', flex:'45%'}}>
        </DialogActions>
        <DialogActions style={{ flex:'45%'}} >

         <Button autoFocus onClick={handleSubmit} color="primary" className={classes.hover}>
               Potvrdi
        </Button>
                             
              
          <Button onClick={()=>props.close()} color="primary" autoFocus className={classes.hover}>
          Prekid
          </Button>
        </DialogActions>
       
        </div>
      </Dialog>
    </div>
  );
}
