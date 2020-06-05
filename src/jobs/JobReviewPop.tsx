import React from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';



const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);




export default function ProposalResponse(props:any){
return <Dialog
        open={props?.open}
        onClose={()=>props.close()}
        aria-labelledby="responsive-dialog-title"
        
      >
        <DialogTitle id="responsive-dialog-title">Vaše iskustvo s {props.user?.Name} {props.user?.LastName}</DialogTitle>
        <DialogContent>
        <form>    
        <TextField
              variant="outlined"
              margin="normal"
              required
              type="text"
              color="primary"
              fullWidth
              id="OverView"
              value={props.proposal?.OverView}              
              label="Komentar"
              name="Komentar"
              onChange={(e)=>props.updateProposalFunc(e)}
              placeholder="Iskažite koliko ste zadovoljni uslugom korisnika"
              multiline
              rows={5}
            />

            <div>
            
              <PrettoSlider valueLabelDisplay="auto" id="Mark" aria-label="pretto slider"  defaultValue={props.proposal?.Mark} min={1} max={5} step={0.5} style={{width:'70%', margin:'0 auto'}} onChange={(e)=>props.updateProposalFunc(e)} />
              <Typography gutterBottom variant="body1">Ocjenite od 1 do 5</Typography>
            </div>
        </form>
        </DialogContent>
        <div style={{display:'flex', marginTop:'15px'}}>
        <DialogActions style={{ flex:'45%'}} >

          {
            props.proposal?.OverView ?  <Button autoFocus onClick={()=>props.submitUpdate(props.proposal!)} color="primary">
                                  Update
                              </Button> : 
                              <Button autoFocus onClick={()=>props.submitUpdate(props.proposal!)} color="primary">
                                   Potvrdi
                               </Button>
                             
          }
        
          <Button onClick={()=>props.close()} color="primary">
          Prekid
          </Button>
        </DialogActions>
       
        </div>
      </Dialog>
}


