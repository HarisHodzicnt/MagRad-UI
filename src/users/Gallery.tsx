import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop:'15px',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    fontWeight:'bold',
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineGridList(props:any) {
  const classes = useStyles();

  let numberImages=(props.images?.length%2==0) ? 2 : 2.5;
  if(props.images?.length==1)
  {
    numberImages=1
  }
 
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={numberImages}>
        {props.images?.map((image:any, index:number) => (
          <GridListTile key={image} style={{minHeight:'25vh', marginBottom:'15px'}}>
            <img src={`http://localhost:52906/Images/work/${props.id}/${props.title}/${image}`} style={{maxWidth:'300px'}} alt={`work image ${index}`} />
            <GridListTileBar
              title={"Slika " + index}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${index}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
            
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}