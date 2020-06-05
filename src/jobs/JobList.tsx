import React, { useState, useEffect } from 'react'
import { Job} from '../account/types';
import { jobUrl, getDataToDatabase, changeFirstToUpperArray } from '../environment/environment';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './proba.css'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin:'20px'
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
  
  },
  pos: {
    marginBottom: 12,
  },
}));

const Kantoni = [
  {
    label: 'SBK',
  },
  {
    label: 'KSB',
  },
  {
    label: 'ZD',
  },
  {
    label: 'KKK',
  },
];



const Poslovi = [
  {
    label: 'IT',
  },
  {
    label: 'Zanati',
  },
  {
    label: 'Poljoprivreda',
  },
  {
    label: 'Ostalo',
  },
];


const JobList=(props:any)=>{
    const [allJobs, setJobs]=useState<Job[]>();
    const [advanced, setAdvanced]=useState<boolean>(false);
    const [kanton, setKanton] = React.useState('Kanton');
    const [grupaPosla, setPosao] = React.useState('Kategorija');
    const classes=useStyles()

    useEffect(()=>{ 
            try {
                getDataToDatabase(`${jobUrl}`, props.jwt)
                .then((y) => y.json())
                .then((jobs) => {
                  console.log(jobs)
                  const jobsCopy: Job[] = changeFirstToUpperArray<Job[]>(jobs)
                  console.log(jobsCopy)
                  setJobs(jobsCopy)
                })
            } catch (error) {
              props.history.push("/login")
            }    
          
    },[])


    const handleChange = (event:any) => {
      setKanton(event.target.value);
    };


    const handleChangePosao = (event:any) => {
      setPosao(event.target.value);
    };

    console.log(allJobs)
    return(<div style={{display:'flex', justifyContent:'space-between'}}>
            <section style={{flex:'23%'}}>
              <h2>Recently searches</h2>
              <ul className="sve">
                <li>item1</li>
                <li>item1</li>
                <li>item1</li>
              </ul>
              <span style={{color:'blue'}} onClick={()=>{setAdvanced(true)}}>Advanced search</span>
              {
                advanced ?<form style={{marginTop:'50px'}}>
                                    <TextField
                                    id="outlined-helperText"
                                    label="City"
                                    defaultValue="Sarajevo"
                                    helperText="Grad za koji tražite posao"
                                    variant="outlined"
                                    style={{width:'90%', marginBottom:'25px'}}
                                  />
                                   <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label="Kanton"
                                    value={kanton}
                                    onChange={handleChange}
                                    SelectProps={{
                                      native: true,
                                    }}
                                    helperText="Proizvoljno"
                                    variant="outlined"
                                  >
                                    {Kantoni.map((option) => (
                                      <option key={option.label} value={option.label}>
                                        {option.label}
                                      </option>
                                    ))}
        </TextField>

        <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label="Kategorija"
                                    value={grupaPosla}
                                    onChange={handleChangePosao}
                                    SelectProps={{
                                      native: true,
                                    }}
                                    helperText="Proizvoljno"
                                    variant="outlined"
                                    style={{marginLeft:'5px'}}
                                  >
                                    {Poslovi.map((option) => (
                                      <option key={option.label} value={option.label}>
                                        {option.label}
                                      </option>
                                    ))}
        </TextField>

                                <TextField
                                    id="outlined-helperText"
                                    label="Pretraži poslove"
                                    defaultValue="Kiropraktičar"
                                    helperText=""
                                    variant="outlined"
                                    style={{width:'90%', marginTop:'15px'}}
                                  />
 
        <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
          <SearchIcon className={classes.extendedIcon} />
          Pretraži
        </Fab>
                         </form> : false
              }
             
            </section>
            <section style={{flex:'76%'}}>
              <h1 style={{textAlign:'left'}}>Filteri --- > /SBK/Travnik/Jagode</h1>
                {
                allJobs?.map(job=>{
                    return <Card className={classes.root}>
                                  <CardContent>
                                  <Typography variant="body1"  className={classes.title} style={{textAlign:'left'}} color="textSecondary" gutterBottom>
                                      <span style={{borderBottom:'2px solid grey'}}>Haris Hodžić</span>
                                    </Typography>
                                    <Typography variant="h4"  className={classes.title} color="textSecondary" gutterBottom>
                                    {
                                    job.Title}
                                    </Typography>
                                   
                                    <div>
                                        <span>Opis: </span>
                                        <Typography variant="body1">
                                            {
                                          job.Description}
                                      <br />
                                      </Typography>
                                    </div>
                                 
                                 <div style={{display:'flex', width:'70%', margin:'0 auto', justifyContent:'flex-end', marginTop:'50px'}}>
                                   <span>Procijenjeni budzet: </span>
                                    <Typography className={classes.pos} color="textSecondary">
                                    {
                                      job.Payment} KM
                                      </Typography>
                                 </div>
                                    
                                  </CardContent>
                                  <CardActions style={{justifyContent:'flex-end',  padding:'0px 0px 5px 0px'}}   onClick={()=>{props.history.push({pathname:`/proposal/`+
                                      job.Id, state:{jobId:
                                        job.Id}})}}>
                                    <Button size="small" style={{borderTop:'1px solid green', borderBottom:'1px solid green'}}>Prijavi se</Button>
                                    
                                  </CardActions>
                                  <CardActions style={{justifyContent:'flex-start',  padding:'0px 0px 5px 0px'}}   onClick={()=>{props.history.push({pathname:`/job/details/`+
                                      job.Id, state:{jobId:
                                        job.Id}})}}>
                                    <Button size="small" style={{borderTop:'1px solid green', borderBottom:'1px solid green'}}>Prijavi se</Button>
                                    
                                  </CardActions>
                        </Card>
                        
                })}
            </section>
        </div>)
}

export default JobList;