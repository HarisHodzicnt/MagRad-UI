import React from 'react';

import Slider from "react-slick";
import classes from '*.module.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import { Proposal } from '../account/types';



const useStyles = makeStyles((theme: Theme) =>
createStyles({  
    arrowLeft:{
    width: 0,
    height: 0,
    borderTop: '4vmin solid transparent',
    borderBottom: '4vmin solid transparent',
    borderRight: '4vmin solid #2B3247',
    '&:hover':{
        cursor:'pointer'
    },
    '&::before':{
        display:'none'
    },
    display:'block'

  },
  arrowRight:{
    width: 0,
    height: 0,
    borderTop: '4vmin solid transparent',
    borderBottom: '4vmin solid transparent',
    borderLeft: '4vmin solid #2B3247',
    '&:hover':{
        cursor:'pointer'
    },
    '&::before':{
        display:'none'
    },
    display:'block'
  },

}),
);


const Carousel=(props:any)=>{
    
    const classes=useStyles()

    props.proposals?.push(props.proposals[0]) // obriši ovo


    function SampleNextArrow(props:any) {
        const { className, style, onClick } = props;
        console.log(className)
        return (
            <div
            className={`${classes.arrowRight} ${className}`}
            onClick={onClick}
            style={{ ...style, display: "block"}}
        
          />
        );
      }
      
      function SamplePrevArrow(props:any) {
        const { className, style, onClick } = props;
        return (
          <div
          className={` ${className} ${classes.arrowLeft}`}
            onClick={onClick}
            style={{...style, display: "block"}}

          />
        );
      }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

      return (
        <div style={{width:'70%', margin:'0 auto'}}>
          <Slider {...settings}>
          {
        props.proposals?.map((proposal:Proposal)=>{
        return <div style={{borderTop:'2px solid grey', width:'60%', margin:'0 auto', fontSize:'2vmin', borderRadius:'20%'}}>
            <div style={{width:'60%', textAlign:'left', margin:'20px auto',display:'flex'}}>
            <span style={{flex:'15%'}}><b>Poslodavac: </b></span>
            <span style={{flex:'75%', textAlign:'justify'}}>
             Ime Prezime
            </span>
            </div>

            <div style={{width:'60%', textAlign:'left', margin:'10px auto', display:'flex'}}>
              <span style={{flex:'15%'}}><b>Komentar: </b></span>
              <span style={{flex:'75%', textAlign:'justify'}}>
              {
                proposal.OverView
              } 
              jako mi se svidja i preporucujem svima ovog gospodina. Uljepao mi je ove hladne dane svojim savjetima o kuhanju.
            </span>
            </div>


            <div style={{width:'60%', textAlign:'left', margin:'0 auto', display:'flex'}}>
            <span style={{flex:'15%'}}><b>Ocjena: </b></span>
                  <span style={{flex:'75%', textAlign:'justify'}}>
                    {
                      proposal.Mark} 
                     <StarIcon style={{color:"#DAA520", verticalAlign:'middle', marginTop:'-5px', marginLeft:'5px'}}/>
                  </span>
            </div>
        </div>
        })
      }
          </Slider>
        </div>
      );
}

export default Carousel
