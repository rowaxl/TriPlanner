import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  CardContent,
  Typography,
  Fab,
  Paper,
  Card,
  CardActionArea,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import '../styles/trips.css';
import CardBar from '../components/cardBar';
import TripCard from '../components/tripCard';
import TripDetail from '../components/tripDetail';

import {
  postNewTrip,
  getTrips,
  deleteTrip,
  updateTrip,
  getDestinations
} from '../apis/trips';

import { nanoid } from 'nanoid';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    paddingTop: 80,
  },
  createButton: {
    position: "fixed",
    right: "10%",
    bottom: "10%",
  },
  sectionTitle: {
    marginTop: 50,
    marginBottom: 10,
  },
  messageNoTrips: {
    color: theme.palette.warning.dark,
    margin: 'auto',
  },
  eventSquare: {
    padding: '0 10px',
    background: theme.palette.grey[300],
    overflowX: 'scroll',
    width: '100%',
    minHeight: 340,
    whiteSpace: 'nowrap'
  },
  eventWrap: {
    display: 'flex',
    width: 'max-content',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    height: '100%'
  },
  seeAllCard: {
    display: 'inline-block',
    width: 300,
    height: 300,
    margin: 'auto 15px',
    background: 'rgba(33, 150, 254, 0.3)',
    border: '3px #2196F4 dashed'
  },
  seeAllButton: {
    height: '100%'
  },
  seeAllButtonText: {
    color: '#215590',
    textAlign: 'center'
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

let Trips = props => {
  const classes = useStyles();
  const history = useHistory();
  const { auth } = props;

  const [destinations, setDestinations] = useState([]);
  const [upcommingTrip, setUpcommingTrip] = useState([]);
  const [nextMonthTrip, setNextMonthTrip] = useState([]);

  const [showTripDetail, setTripCardDetail] = useState(false);
  const [tripDetail, setTripDetail] = useState(null);
  const [detailType, setDetailType] = useState('');

  useEffect(() => {
    if (!auth || auth.length < 1)
      return history.push('/');

    getAllTrips();
    readyDestinations();
  }, [auth]);

  const readyDestinations = async () => {
    const result = await getDestinations(auth);

    setDestinations(result);
  };

  const getAllTrips = async () => {
    let upcomming = await getTrips(auth, 'upcomming');
    let nextMonth = await getTrips(auth, 'nextMonth');

    setUpcommingTrip(upcomming['trips']);
    setNextMonthTrip(nextMonth['trips']);
  };

  const renderTrips = (type) => {
    let trips = type === 'upcomming' ? upcommingTrip : nextMonthTrip;

    if (trips.length === 0) {
      return <Typography className={classes.messageNoTrips} variant="h5">There is no trips yet!</Typography>;
    }

    const tripCards = trips
      .sort((a, b) => a.startDate - b.startDate)
      .slice(0, 5)
      .map(trip => <TripCard key={trip.id} trip={trip} onTripClick={openTripDetail} />);

    if (tripCards.length === 0) {
      return <Typography className={classes.messageNoTrips} variant="h5">There is no trips yet!</Typography>;
    }

    tripCards.push(
      <Card key={type} className={classes.seeAllCard} variant="outlined">
        <CardActionArea className={classes.seeAllButton} onClick={showAllTrips}>
          <Typography className={classes.seeAllButtonText} variant="h5">See All</Typography>
        </CardActionArea>
      </Card>
    );

    return tripCards;
  }

  const openTripDetail = (id) => {
    let trips = upcommingTrip.concat(nextMonthTrip);
    const target = trips.find(trip => trip.id === id);

    if (target) {
      setDetailType('view');
      setTripDetail(target);
      setTripCardDetail(true);
    }
  }

  const closeTripDetail = () => {
    setTripDetail(null);
    setTripCardDetail(false);
  }

  const onClickCreateTrip = () => {
    setDetailType('create');
    setTripDetail({});
    setTripCardDetail(true);
  }

  const saveTrip = async (tripDetail) => {
    Object.assign(tripDetail, { id: nanoid() });

    // TODO: catch and handle error
    await postNewTrip(auth, tripDetail);

    setTripDetail(null);
    setTripCardDetail(false);

    getAllTrips();
  }

  const startEditTrip = id => {
    let trips = upcommingTrip.concat(nextMonthTrip);
    const target = trips.find(trip => trip.id === id);

    if (target) {
      setDetailType('edit');
      setTripDetail(target);
      setTripCardDetail(true);
    }
  };

  const onClickDeleteTrip = async (id) => {
    let trips = upcommingTrip.concat(nextMonthTrip);
    const target = trips.find(trip => trip.id === id);

    if (target) {
      setTripCardDetail(false);

      const res = await deleteTrip(auth, id);

      if (!res) {
        // TODO: handle Delete Error
      }

      getAllTrips();
    }
  }

  const saveEditTrip = async (tripDetail) => {
    const upcommingIndex = upcommingTrip.findIndex(trip => trip.id === tripDetail.id);
    const nextMonthIndex = nextMonthTrip.findIndex(trip => trip.id === tripDetail.id);

    if (upcommingIndex > -1) {
      upcommingTrip[upcommingIndex] = tripDetail;
    }

    if (nextMonthIndex > -1) {
      nextMonthIndex[nextMonthIndex] = tripDetail;
    }

    const res = await updateTrip(auth, tripDetail);
    if (!res) {
      // TODO: handle error
    }

    getAllTrips();
    setDetailType('view');
    setTripDetail(tripDetail);
    setTripCardDetail(true);
  };

  const showAllTrips = () => {
    history.push('/browse');
  }

  return (
    <CardContent className={classes.root}>
      <CardBar />

      <Typography className={classes.sectionTitle} variant="h4">Upcomming Trips!</Typography>
      <Paper className={classes.eventSquare}>
        <div className={classes.eventWrap}>
          { renderTrips('upcomming') }
        </div>
        
      </Paper>

      <Typography className={classes.sectionTitle} variant="h4">Plans for next month(Aug 2020)</Typography>
      <Paper className={classes.eventSquare}>
        <div className={classes.eventWrap}>
          { renderTrips('nextMonth') }
        </div>
      </Paper>

      <Fab id="fab-create-plan" className={classes.createButton} aria-label="add" onClick={onClickCreateTrip}>
        <AddIcon />
      </Fab>

      <TripDetail
        destinations={destinations}
        detailType={detailType}
        tripDetail={tripDetail}
        showTripDetail={showTripDetail}
        closeTripDetail={closeTripDetail}
        saveTrip={saveTrip}
        handleEdit={startEditTrip}
        handleDelete={onClickDeleteTrip}
        saveEditTrip={saveEditTrip}
      />
    </CardContent>
  );
}

Trips = connect(state => ({
  auth: state.auth
}))(Trips);

export default Trips;