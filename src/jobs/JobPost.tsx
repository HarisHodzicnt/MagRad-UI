import React, { useState, useEffect } from "react"
import { Employeer, Job } from "../account/types";
import { jobUrl, postDataToDatabase } from "../environment/environment";
import moment from 'moment'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';
import 'date-fns';

const useStyles = makeStyles((theme: Theme) =>
createStyles({  
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})
);
{/* <TextField
variant="outlined"
margin="normal"
required
color="primary"
fullWidth
id={property}
label={property}
name="Prezime"
value={moment(jobData[property]).format("MM-DD-YY")}
onChange={handleChange}
placeholder="Vaše prezime"
/> */}

const JobPost = (props:any) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>( new Date('2014-08-18T21:11:54'),);
  const classes=useStyles()
  const [jobData, setJobData]=useState<Job>({Id:0, 
    Title:"",
    Description:"",
    Payment:0, 
    EmployeerId:props.id, 
    StartDate:new Date()});

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setJobData({ ...jobData, [e.currentTarget.id]: e.currentTarget.value })
  }


  const handleDateChange = (date: Date | null) => {
    if(date!=null)
    setJobData({ ...jobData, StartDate: date })
  };
  const handleSubmit = async () => {

    await postDataToDatabase(`${jobUrl}`, jobData, props.jwt).then(x => x.json()).then(y => { props.history.push( { pathname: "/profile"} ) })
  }
  return <div style={{marginTop:'50px', width:'60%', margin:'50px auto' }}>
         <div>
      {Object.getOwnPropertyNames(jobData).map((property:string)=> {
        return (
            //@ts-ignore
            !(["Start Date", "Id", "EmployeerId"].includes(property)) ?
          <div>
            {
              property==="StartDate" ? 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id={property}
                label={property}
                value={jobData[property]}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
             :
            <TextField
            variant="outlined"
            margin="normal"
            required
            color="primary"
            fullWidth
            id={property}
            label={property}
            name="Prezime"
            // @ts-ignore
            value={jobData[property]}
            onChange={handleChange}
            placeholder="Unsite u polje"
            multiline ={property==="Description" ? true : false}
            rows={4}
          />

            }
            
          </div> : false
        )
      })}

      <Button
       fullWidth
       variant="contained"
       color="primary"
       className={classes.submit}
       onClick={handleSubmit}
     >
       Potvrdi
     </Button>
    </div>
  </div>
}

export default JobPost
