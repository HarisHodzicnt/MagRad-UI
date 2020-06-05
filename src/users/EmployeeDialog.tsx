import React, { useEffect, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { EmployeeWorks } from '../account/types';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { postDataToDatabase, putDataToDatabase, getDataToDatabase, postFormDataToDatabase, putFormDataToDatabase, changeFirstToUpperArray } from '../environment/environment';



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


export default function EmployeeDialog(props:any) {

  const [work, setWork] = React.useState<EmployeeWorks>({EmployeeeId:props.EmployeeId, Title:props.workExp?.title, Description:props.workExp?.description, AllPathsPhotos:""});
  const [showGallery, setShowGallery]=React.useState<Array<string>>([]);
  const pictures_exists=props.workExp?.allPathsPhotos?.split(",")
  if(pictures_exists)
  pictures_exists.pop()

  console.log(props.workExp)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles()


  const handleChange=(e:any)=>{
                //@ts-ignore
        setWork({...work, [e.currentTarget.id]: e.currentTarget.value})
  }

  const saveGallery=(e:ChangeEvent<HTMLInputElement>)=>{
    const gallery:File[]=[];
    let files:Array<string>=[];
    if(e?.currentTarget?.files)
    Array.from(e?.currentTarget?.files).forEach((file:any) => {
        const photoExtension:string=e.target.value.split("\\").pop()!.split(".").pop()!;
        if (["jpeg", "jpg", "png", "svg"].includes(photoExtension))
            {
                gallery.push(file)
                files.push(URL.createObjectURL(file))
            }
    });

    setShowGallery(files)
    setWork({...work, Photos:gallery})
  
  }


  const createFormData=(data:EmployeeWorks):FormData=> {
    const form= new FormData();
    for (const prop in data) {
        if(prop=="Photos")
        { 
              //@ts-ignore
            for (var i = 0; i < data[prop]?.length; i++) {
              //@ts-ignore
            form.append(prop, data[prop][i]);
              }
       
        }
        else{
          //@ts-ignore
        form.append(prop, data[prop]);
        }
    }
    return form;
  }

  const handleSubmit=async()=>{
    console.log("post")
    const form = createFormData(work)
    console.log(work)
     await postFormDataToDatabase(`http://localhost:52906/employeeWork`, form, props.jwt).then(x=>x).then(async x=>{
      await getDataToDatabase(`http://localhost:52906/employeeWork/${props.EmployeeId}`, props.jwt).then((y) => y.json()).then((x) =>{
        const employeeWork:EmployeeWorks[]=changeFirstToUpperArray<EmployeeWorks[]>(x);
        props.updateWorkExp(employeeWork)
        //@ts-ignore
        setWork(null)
        setShowGallery([])
        props.close()}

        ).catch(e=>console.log)
      })
  }

  const handleUpdate=async()=>{
    const data:EmployeeWorks={Id:props.workExp.Id, EmployeeeId:props.EmployeeId, Title:props.workExp.Title, Description:props.workExp.Description, AllPathsPhotos:props.workExp.AllPathsPhotos};
    for (const prop in work) {
        //@ts-ignore
      if(work[prop]!=undefined && work[prop]!="")
      {
        //@ts-ignore
        data[prop]=work[prop]
      }
    
    }
    console.log(data)

    const form = createFormData(data)
    await putFormDataToDatabase(`http://localhost:52906/employeeWork/updateEmployeeWork`, form, props.jwt).then(x=>x).then(async x=>{
      console.log(x)
      await getDataToDatabase(`http://localhost:52906/employeeWork/${props.EmployeeId}`, props.jwt).then((y) => y.json()).then((x) =>{
        const employeeWork:EmployeeWorks[]=changeFirstToUpperArray<EmployeeWorks[]>(x);
    
        props.updateWorkExp(employeeWork)
        //@ts-ignore
        setWork(null)
        setShowGallery([])
        //@ts-ignore
        props.close()}
        ).catch(e=>console.log)
      })
  }

  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={()=>props.close()}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Vaše prijašnje iskustvo ( poslovi koje ste radili )</DialogTitle>
        <DialogContent>
        <form>    
        <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id="Title"
              value={work?.Title || props.workExp?.Title}
              label="Naslov"
              name="Naslov"
              onChange={handleChange}
              placeholder="Unesite naziv pozicije"
         
            />
           <TextField
              variant="outlined"
              margin="normal"
              required
              color="primary"
              fullWidth
              id="Description"
              label="Opis"
              name="Opis"
              value={work?.Description || props.workExp?.Description}
              onChange={handleChange}
              placeholder="Upišite u nekoliko rečenica vaša zaduženja"
              multiline
                rows={4}
                rowsMax={6}
            />
          
          <span>Korisnici koji unesu nekoliko slika kao dokaz svoje stučnosti, imaju za <b>80%</b> veću šansu da budu izabrani od strane drugih korisnika.</span><br/><br/>
          <div style={{width:'80%', margin:'0 auto', display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
            {
                showGallery.length ? showGallery.map((image:any)=>{
                  return <img src={image} alt={image} style={{flex:'45%', maxWidth:'200px', width:'100%', height:'7rem'}}/>
                }) : pictures_exists?.map((image:any)=>{
                  return <img src={`http://localhost:52906/Images/work/${props.EmployeeId}/${props.workExp.Title}/${image}`} alt={image} style={{flex:'45%',maxWidth:'200px', width:'100%', height:'7rem'}}/>
                })
            }
       </div>
            <label htmlFor="slike" className={classes.inputfile}>
                Odaberite file
            </label>
            <input type="file" id="slike" multiple style={{display:'none'}} onChange={saveGallery}/>
       
        </form>
        </DialogContent>
        <div style={{display:'flex', marginTop:'15px'}}>
        <DialogActions style={{justifyContent:'start', flex:'45%'}}>

        {
          props.workExp ?  <Button autoFocus onClick={handleUpdate} color="primary"  className={classes.hover}>
                                Delete
                            </Button> : 
                      false
                          
        }
        </DialogActions>
        <DialogActions style={{ flex:'45%'}} >

          {
            props.workExp ?  <Button autoFocus onClick={handleUpdate} color="primary" className={classes.hover}>
                                  Update
                              </Button> : 
                              <Button autoFocus onClick={handleSubmit} color="primary" className={classes.hover}>
                                   Potvrdi
                               </Button>
                             
          }
        
          <Button onClick={()=>props.close()} color="primary" autoFocus className={classes.hover}>
          Prekid
          </Button>
        </DialogActions>
       
        </div>
      </Dialog>
    </div>
  );
}
