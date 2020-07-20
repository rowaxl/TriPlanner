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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { convertToDay } from '../libs/utils';

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
    position: 'relative'
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
  tripUserNameWrap: {
    position: 'absolute',
    right: '5%',
    display: 'flex',
    alignItems: 'center',
  },
  userIcon: {
    color: theme.palette.success.main,
    marginRight: 10,
  },
}));

let TripDetail = props => {
  const classes = useStyles();
  const {
    destinations,
    tripDetail,
    showTripDetail,
    closeTripDetail,
    detailType,
    saveTrip,
    handleEdit,
    handleDelete,
    saveEditTrip,
  } = props;

  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);

  const todayStart = moment(today).startOf('day').unix() * 1000;
  const todayEnd = moment(nextDay).startOf('day').unix() * 1000;

  const initialNewTrip = { destination: '', startDate: todayStart, endDate: todayEnd, description: '' };
  const [newTripDetail, setNewTripDetail] = useState(initialNewTrip);

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

    return `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()} (${convertToDay(endDate - startDate)} days)`;
  };

  const changeStartDate = event => {
    const input = event.target.value;
    const startDate = moment(input).unix() * 1000;
    const newDetail = { ...newTripDetail, startDate: startDate };

    if (startDate > moment(newTripDetail.endDate).unix() * 1000) {
      newDetail.endDate = moment(startDate).format('YYYY-MM-DD');
    }

    setNewTripDetail(newDetail);
  };

  const changeEndDate = event => {
    const input = event.target.value;
    const endDate = moment(input).unix() * 1000;
    const newDetail = { ...newTripDetail, endDate: endDate };

    if (endDate < moment(newTripDetail.startDate).unix() * 1000) {
      newDetail.startDate = moment(endDate).format('YYYY-MM-DD');
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
  }

  const saveNewTrip = () => {
    const newTrip = newTripDetail;
    newTrip.startDate = newTripDetail.startDate;
    newTrip.endDate = newTripDetail.endDate;

    if (detailType === 'create') {
      saveTrip(newTrip);
    } else {
      saveEditTrip(newTripDetail);
    }

    setNewTripDetail({ destination: '', startDate: today, endDate: today, description: '' });
  };

  const resetNewTrip = () => {
    if (detailType === 'create') {
      setNewTripDetail({ destination: '', startDate: today, endDate: today, description: '' });
    } else if (detailType === 'edit') {
      handleEdit(tripDetail.id);
    }
  }

  const discardNewTrip = () => {
    setNewTripDetail({ destination: '', startDate: today, endDate: today, description: '' });
    closeTripDetail();
  };

  const onClickEdit = () => {
    handleEdit(tripDetail.id);

    setNewTripDetail(tripDetail);
  }

  const onClickDelete = () => {
    handleDelete(tripDetail.id);
  }

  const renderUserName = () => {
    if (tripDetail.user) {
      return (
        <div className={classes.tripUserNameWrap}>
          <AccountCircleIcon className={classes.userIcon} fontSize="large" />
          <Typography variant="h6" component="span">
            {tripDetail.user.name}
          </Typography>
        </div>
      );
    }

    return <></>;
  }

  const renderDestinations = () => {
    if (destinations.length > 0) {
      return (
        destinations.map(d => <MenuItem key={d._id} value={d.name}>{d.name}</MenuItem>)
      );
    }

    return <></>;
  }

  const renderTripDetail = () => {
    if (detailType === 'create' || detailType === 'edit') {
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
            {renderUserName()}

            <Typography className={classes.formTitle} gutterBottom variant="h5" component="h3">
              Destination:
              <Select
                className={classes.textField}
                value={newTripDetail.destination}
                onChange={changeDestination}
              >
                <MenuItem value=''>None</MenuItem>
                { renderDestinations() }
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
              value={newTripDetail.description}
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
          {renderUserName()}
          <Typography gutterBottom variant="h5" component="h4">Destination: {tripDetail.destination}</Typography>

          <Typography className={classes.formTitle} gutterBottom variant="h5" component="p">Date</Typography>
          <Typography variant="h6" component="span">
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
              onClick={onClickEdit}
            >
              Edit
            </Button>

            <Button
              className={classes.deleteButton}
              variant="contained"
              onClick={onClickDelete}
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