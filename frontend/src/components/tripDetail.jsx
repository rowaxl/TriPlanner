import React, { useState } from 'react';
import {
  CardContent,
  Typography,
  Card,
  CardMedia,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { makeStyles } from '@material-ui/core/styles';
import { convertToDay } from '../libs/utils';

// TODO: change this to API
import dummyDestination from '../libs/dummyDestination';

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
    overflow: 'scroll',
  },
  tripDetailThumbnail: {
    height: '30vh',
    minHeight: 400,
  },
  tripDetailThumbnailEmpty: {
    height: '30vh',
    minHeight: 400,
    background: '#ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tripDetails: {
    height: '15vh',
    minHeight: 150,
  },
  datePicker: {
    display: 'inline-flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  descriptionForm: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 600,
  },
  formTitle: {
    marginTop: '20px',
  },
  buttonWrap: {
    margin: '30px 0'
  },
  saveButton: {
    background: theme.palette.success.light,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  resetButton: {
    background: theme.palette.warning.light,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  editButton: {
    background: theme.palette.info.light,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    background: theme.palette.error.light,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  discardButton: {
    background: theme.palette.grey[200],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

let TripDetail = props => {
  const classes = useStyles();
  const { tripDetail, showTripDetail, closeTripDetail, detailType, saveTrip } = props;
  const today = new Date().toISOString().substring(0, 10);
  const initialNewTrip = { destination: '', startDate: today, endDate: today, description: '' };
  const [newTripDetail, setNewTripDetail] = useState(initialNewTrip);
  const [destinations, setDestinations] = useState(dummyDestination);

  if (!tripDetail) {
    return <></>;
  }

  const renderDate = () => {
    const startDate = new Date(tripDetail.startDate);
    const endDate = new Date(tripDetail.endDate);
    const today = new Date();

    if (startDate > today) {
      const remainDate = convertToDay(startDate - today);
      return `${startDate.toLocaleDateString()} (Remain ${remainDate} days) ~ ${endDate.toLocaleDateString()} (${(endDate - startDate) / (1000 * 3600 * 24)} days)`;
    }

    return `${ startDate.toLocaleDateString() } ~ ${endDate.toLocaleDateString()} (${convertToDay(endDate - startDate)} days)`;
  }

  const changeStartDate = event => {
    const input = event.target.value;
    const startDate = new Date(input).getTime();
    const newDetail = { ...newTripDetail, startDate: startDate };

    if (startDate > newTripDetail.endDate) {
      newDetail.endDate = startDate;
    }

    setNewTripDetail(newDetail);
  };

  const changeEndDate = event => {
    const input = event.target.value;
    const endDate = new Date(input).getTime();
    const newDetail = { ...newTripDetail, endDate: endDate };

    if (endDate < newTripDetail.startDate) {
      newDetail.startDate = endDate;
    }

    setNewTripDetail(newDetail);
  };

  const changeDescription = event => {
    const input = event.target.value;
    setNewTripDetail({ ...newTripDetail, description: input });
  };

  const changeDestination = event => {
    const input = event.target.value;
    if (!input) {
      setNewTripDetail({ ...newTripDetail, destination: '' });
      return;
    }

    const destination = destinations.find(d => d.name === input);

    setNewTripDetail({ ...newTripDetail, thumbnail: destination.thumbnail, destination: destination.name });
    // TODO: set thumbnail
  }

  const saveNewTrip = () => {
    const newTrip = newTripDetail;
    newTrip.startDate = new Date(newTripDetail.startDate).getTime();
    newTrip.endDate = new Date(newTripDetail.endDate).getTime();
    saveTrip(newTrip);
  };

  const resetNewTrip = () => {
    changeDescription('');
    setNewTripDetail(initialNewTrip);
  }

  const discardNewTrip = () => {
    setNewTripDetail(initialNewTrip);
    changeDescription({ target: { value: '' }});
    closeTripDetail();
  };

  const renderTripDetail = () => {
    if (detailType === 'create') {
      const thumbnail = () => {
        if (!newTripDetail.destination) {
          return (
            <div className={classes.tripDetailThumbnailEmpty}>
              <PanoramaIcon style={{ fontSize: 40 }} />
            </div>
          );
        }

        return (
          <CardMedia
            component="img"
            className={classes.tripDetailThumbnail}
            image={newTripDetail.thumbnail}
          />
        )
      }
      
      return (
        <Card className={classes.tripDetailCard}>
          { thumbnail() }

          <CardContent className={classes.tripDetails}>
            <Typography className={classes.formTitle} gutterBottom variant="h5" component="h3">
              Destination:
              <Select
                className={classes.textField}
                value={newTripDetail.destination}
                onChange={changeDestination}
              >
                <MenuItem>None</MenuItem>
                { destinations.map(d => <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>) }
              </Select>
            </Typography>

            <Typography className={classes.formTitle} gutterBottom variant="h5" component="p">Date</Typography>

            <Typography variant="h6" component="span">From: </Typography>
            <form className={classes.datePicker}>
              <TextField
                id="startDate"
                type="date"
                value={new Date(newTripDetail.startDate).toISOString().substring(0, 10)}
                className={classes.textField}
                onChange={changeStartDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>

            <Typography variant="h6" component="span">To: </Typography>
            <form className={classes.datePicker}>
              <TextField
                id="endDate"
                type="date"
                value={new Date(newTripDetail.endDate).toISOString().substring(0, 10)}
                className={classes.textField}
                onChange={changeEndDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>

            <Typography className={classes.formTitle} gutterBottom variant="h5" component="p">
              Description: 
            </Typography>
            <TextField
              className={classes.descriptionForm}
              type="text"
              variant="outlined"
              multiline
              rows={4}
              onChange={changeDescription}
            />

            <div className={classes.buttonWrap}>
              <Button
                className={classes.saveButton}
                variant="contained"
                onClick={saveNewTrip}
              >
                Save
              </Button>

              <Button
                className={classes.resetButton}
                variant="contained"
                onClick={resetNewTrip}
              >
                Reset
              </Button>
              <Button
                className={classes.discardButton}
                variant="contained"
                onClick={discardNewTrip}
              >
                Discard
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }


    return (
      <Card className={classes.tripDetailCard}>
        <CardMedia
          component="img"
          className={classes.tripDetailThumbnail}
          image={tripDetail.thumbnail}
        />

        <CardContent className={classes.tripDetails}>
          <Typography gutterBottom variant="h4" component="h3">Destination: {tripDetail.destination}</Typography>

          <Typography variant="h6" component="p">
            {renderDate()}
          </Typography>

          <Typography className={classes.formTitle} gutterBottom variant="h5" component="p">
            Description: 
          </Typography>
          <TextField
            className={classes.descriptionForm}
            type="text"
            variant="outlined"
            value={tripDetail.description}
            multiline
            rows={4}
          />

          <div className={classes.buttonWrap}>
              <Button
                className={classes.editButton}
                variant="contained"
              >
                Edit
              </Button>

              <Button
                className={classes.deleteButton}
                variant="contained"
              >
                Delete
              </Button>
              <Button
                className={classes.discardButton}
                variant="contained"
                onClick={closeTripDetail}
              >
                Close
              </Button>
            </div>
        </CardContent>
      </Card>
    );
  };

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
      disableBackdropClick
      disableEscapeKeyDown
    >
      <Fade in={showTripDetail}>
        { renderTripDetail() }
      </Fade>
    </Modal>
  );
}

export default TripDetail;