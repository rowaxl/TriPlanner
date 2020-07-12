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

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    paddingTop: 80,
  },
  createButton: {
    position: "absolute",
    right: "3%",
    bottom: "4%",
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
  }
}));

let Trips = props => {
  const classes = useStyles();
  const history = useHistory();

  // TODO: get upcoming events from server
  const dummyTrips = [
    { id: '123', title:'Winter Vacation', destination: 'Yellowknife', startDate:1594623600000, endDate:1594796400000, thumbnail: 'https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
    { id: '456', title:'Winter Vacation', destination: 'Yellowknife', startDate:1595228400000, endDate:1596178800000, thumbnail: 'https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
    { id: '789', title:'Winter Vacation', destination: 'Yellowknife', startDate:1596265200000, endDate:1596351600000, thumbnail: 'https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
    { id: '012', title:'Winter Vacation', destination: 'Yellowknife', startDate:1598857200000, endDate:1598943600000, thumbnail: 'https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
  ];
  const [trips, setTrips] = useState(dummyTrips);


  useEffect(() => {
    if (!props.auth || props.auth.length < 1)
      history.push('/');
  });

  const renderEvents = (type) => {
    if (trips.length === 0) {
      return <Typography className={classes.messageNoTrips} variant="h5">There is no trips yet!</Typography>;
    }

    const filterOption = type === 'nextMonth'
      ? (e) => {
        const nextMonthStartDate = new Date();
        nextMonthStartDate.setMonth(nextMonthStartDate.getMonth() + 1);
        nextMonthStartDate.setDate(1);

        const nextMonthEndDate = new Date();
        nextMonthEndDate.setMonth(nextMonthEndDate.getMonth() + 2);
        nextMonthStartDate.setDate(0);

        return new Date(e.startDate) >= nextMonthStartDate && new Date(e.startDate) <= nextMonthEndDate;
        }
      : (e) => {
        return new Date(e.startDate) >= new Date();
      };
  
    const tripCards = trips
      .sort((a, b) => a.startDate - b.startDate)
      .filter(filterOption)
      .map(trip => <TripCard key={trip.id} trip={trip} />);

    if (tripCards.length === 0) {
      return <Typography className={classes.messageNoTrips} variant="h5">There is no trips yet!</Typography>;
    }

    tripCards.push(
      <Card key={type} className={classes.seeAllCard} variant="outlined">
        <CardActionArea className={classes.seeAllButton}>
          <Typography className={classes.seeAllButtonText} variant="h5">See All</Typography>
        </CardActionArea>
      </Card>
    );

    return tripCards;
  }

  return (
    <CardContent className={classes.root}>
      <CardBar />

      <Typography className={classes.sectionTitle} variant="h4">Upcomming Trips!</Typography>
      <Paper className={classes.eventSquare}>
        <div className={classes.eventWrap}>
          { renderEvents('upcoming') }
        </div>
        
      </Paper>

      <Typography className={classes.sectionTitle} variant="h4">Plans for next month(Aug 2020)</Typography>
      <Paper className={classes.eventSquare}>
        <div className={classes.eventWrap}>
          { renderEvents('nextMonth') }
        </div>
      </Paper>

      <Fab id="fab-create-plan" className={classes.createButton} aria-label="add">
        <AddIcon />
      </Fab>
    </CardContent>
  );
}

Trips = connect(state => ({
  auth: state.auth
}))(Trips);

export default Trips;