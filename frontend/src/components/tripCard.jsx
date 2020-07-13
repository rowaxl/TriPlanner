import React from 'react';
import {
  CardContent,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  eventCard: {
    maxWidth: 400,
    minHeight: 300,
    height: 'fit-content',
    margin: 'auto 15px'
  },
}));

let TripCard = props => {
  const { trip } = props;
  const classes = useStyles();

  const handleOnclick = () => {
    props.onTripClick(trip.id);
  }

  return (
    <Card className={classes.eventCard}>
      <CardActionArea onClick={handleOnclick}>
        <CardMedia
          component="img"
          image={trip.thumbnail}
          height="200"
          title={trip.title}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">{trip.destination}</Typography>

          <Typography variant="body1" color="textSecondary" component="p">
            {new Date(trip.startDate).toLocaleDateString() } ~ {new Date(trip.endDate).toLocaleDateString()} ({(trip.endDate - trip.startDate) / (1000 * 3600 * 24)} days)
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TripCard;