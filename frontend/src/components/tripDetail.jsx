import React, { useEffect, useState } from 'react';
import {
  CardContent,
  Typography,
  Fab,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  Modal,
  Backdrop,
  Fade
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripDetailCard: {
    height: '60vh',
    minHeight: 600,
    width: '50vw',
    minWidth: 500,
  },
  tripDetailThumbnail: {
    height: '45vh',
    minHeight: 400,
  },
  tripDetails: {
    height: '15vh',
    minHeight: 150,
  }
}));

let TripDetail = props => {
  const classes = useStyles();
  const { tripDetail, showTripDetail, closeTripDetail } = props;

  const [open, setOpen] = useState(false);

  if (!tripDetail) {
    return <></>;
  }

  const renderDate = () => {
    const startDate = new Date(tripDetail.startDate);
    const endDate = new Date(tripDetail.endDate);
    const today = new Date();
    

    const remainDate = parseInt((startDate - today) / (1000 * 3600 * 24));

    if (startDate > today) {
      return `${startDate.toLocaleDateString()} (Remain ${remainDate} days) ~ ${endDate.toLocaleDateString()} (${(endDate - startDate) / (1000 * 3600 * 24)} days)`;
    }

    return `${ startDate.toLocaleDateString() } ~ ${endDate.toLocaleDateString()} (${(endDate - startDate) / (1000 * 3600 * 24)} days)`;
  }

  const renderTripDetail = () => (
    <Card className={classes.tripDetailCard}>
      <CardMedia
        component="img"
        className={classes.tripDetailThumbnail}
        image={tripDetail.thumbnail}
        title={tripDetail.title}
      />

      <CardContent className={classes.tripDetails}>
        <Typography gutterBottom variant="h4" component="h3">Destination: {tripDetail.destination}</Typography>

        <Typography variant="h6" color="textSecondary" component="p">
          { renderDate() }
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Modal
      className={classes.modal}
      open={showTripDetail}
      onClose={closeTripDetail}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={showTripDetail}>
        { renderTripDetail() }
      </Fade>
    </Modal>
  );
}

export default TripDetail;