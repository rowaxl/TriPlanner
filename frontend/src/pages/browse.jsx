import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Typography,
  CardContent,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Select,
  Button,
  Fab,
  Divider,
  MenuItem,
  Checkbox,
  TextField
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { nanoid } from 'nanoid';
import moment from 'moment';

import CardBar from '../components/cardBar';
import TripCard from '../components/tripCard';
import TripDetail from '../components/tripDetail';

import { USER_ROLE } from '../libs/utils';
import { getUsers } from '../apis/user';
import {
  postNewTrip,
  browseTrip,
  deleteTrip,
  updateTrip,
  getDestinations,
} from '../apis/trips';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    paddingTop: 80,
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
    overflowY: 'scroll',
    width: '100%',
    height: '80vh',
    minHeight: 600,
  },
  eventWrap: {
    display: 'flex',
    width: '100%',
    height: 'fit-contents'
  },
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
  },
  tripWrap: {
    background: '#ddd',
    borderRadius: 5,
    padding: 10,
    flexGrow: 1,
    width: '100%',
  },
  filterWrap: {
    width: '100%',
    marginBottom: 20,
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  filterResetButton: {
    background: theme.palette.warning.main,
    color: '#fff',
  },
  filterSaveButton: {
    background: theme.palette.success.main,
    color: '#fff',
  },
  textField: {
    minWidth: 200,
    marginLeft: 10,
  },
  filterOptionWrap: {
    flexDirection: 'column'
  },
  filterOptions: {
    marginRight: 20,
    marginBottom: 5,
  },
  datePicker: {
    display: 'inline-flex',
    flexWrap: 'wrap',
  },
  createButton: {
    position: "fixed",
    right: "10%",
    bottom: "10%",
  },
}));

let Browse = props => {
  const classes = useStyles();
  const history = useHistory();
  const { auth, userDetail } = props;

  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [showTripDetail, setTripCardDetail] = useState(false);
  const [tripDetail, setTripDetail] = useState(null);
  const [detailType, setDetailType] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [filterValue, setFilterValue] = useState({
    destination: '',
    startDate: 0,
    endDate: 0,
    user: ''
  });
  const [filterChecked, setFilterChecked] = useState({
    destination: false,
    startDate: false,
    endDate: false,
    user: false,
  })

  const [userFilterOptions, setUserFilterOptions] = useState([]);

  const [filterOptions, setFilterOptions] = useState([
    {
      label: 'Destination',
      value: 'destination'
    }, {
      label: 'Start Date',
      value: 'startDate'
    }, {
      label: 'End Date',
      value: 'endDate'
    }]);

  useEffect(() => {
    if (!auth || auth.length < 1)
      return history.push('/');

    if (userDetail.role === USER_ROLE.ADMIN) {
      filterOptions.push({ label: 'User', value: 'user' });
      setFilterOptions(filterOptions);

      readyUsers();
    }

    browseTrips();
    readyDestinations();
  }, [auth, userDetail]);

  const browseTrips = async () => {
    const result = await browseTrip(auth);

    setTrips(result.trips);
  };

  const readyDestinations = async () => {
    const result = await getDestinations(auth);

    setDestinations(result);
  };

  const readyUsers = async () => {
    const users = await getUsers(auth);

    setUserFilterOptions(users.map(user => ({ label: user.name, value: user._id })));
  };

  const openTripDetail = id => {
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

    await postNewTrip(auth, tripDetail);

    setTripDetail(null);
    setTripCardDetail(false);

    browseTrips();
  }

  const startEditTrip = id => {
    const target = trips.find(trip => trip.id === id);

    if (target) {
      setDetailType('edit');
      setTripDetail(target);
      setTripCardDetail(true);
    }
  };

  const onClickDeleteTrip = async (id) => {
    closeTripDetail();
    const res = await deleteTrip(auth, id);

    if (!res) {
      // TODO: handle Delete Error
    }

    browseTrips();
  }

  const saveEditTrip = async tripDetail => {
    const targetIndex = trips.findIndex(trip => trip.id === tripDetail.id);
    trips.splice(targetIndex, 1)
    trips.push(tripDetail);
    trips.sort((a, b) => a.startDate - b.startDate);
    setTrips(trips);

    const res = await updateTrip(auth, tripDetail);
    if (!res) {
      // TODO: handle error
    }

    browseTrips();

    setDetailType('view');
    setTripDetail(tripDetail);
    setTripCardDetail(true);
  };

  const renderTrips = () => {
    if (trips.length === 0) {
      return <Typography className={classes.messageNoTrips} variant="h5">There is no trips yet!</Typography>;
    }

    if (appliedFilters.length > 0) {
      if (filteredTrips.length === 0) {
        return <Typography className={classes.messageNoTrips} variant="h5">There is no trips yet!</Typography>;
      }

      return filteredTrips.sort((a, b) => a.startDate - b.startDate)
        .map(trip => (
          <Grid key={trip.id} item md={6} lg={3}>
            <TripCard key={trip.id} trip={trip} onTripClick={openTripDetail} />
          </Grid>)
        );
    }

    const tripCards = trips
      .sort((a, b) => a.startDate - b.startDate)
      .map(trip => (
        <Grid key={trip.id} item md={6} lg={3}>
          <TripCard key={trip.id} trip={trip} onTripClick={openTripDetail} />
        </Grid>)
      );

    if (tripCards.length === 0) {
      return <Typography className={classes.messageNoTrips} variant="h5">There is no trips yet!</Typography>;
    }

    return tripCards;
  };

  const changeFilterDestination = e => {
    setFilterValue({
      ...filterValue,
      destination: e.target.value
    });

    const appliedIndex = appliedFilters.findIndex(f => f.type === 'destination');

    if (appliedIndex > -1) {
      appliedFilters[appliedIndex] = { type: 'destination', currentValue: e.target.value };
      applyFilterToTrips(appliedFilters);
    }
  };

  const changeFilterStartDate = e => {
    const startDate = moment(e.target.value).unix() * 1000;

    setFilterValue({
      ...filterValue,
      startDate
    });

    const appliedIndex = appliedFilters.findIndex(f => f.type === 'startDate');

    if (appliedIndex > -1) {
      appliedFilters[appliedIndex] = { type: 'startDate', currentValue: startDate };
      applyFilterToTrips(appliedFilters);
    }
  }

  const changeFilterEndDate = e => {
    const endDate = moment(e.target.value).unix() * 1000;
    
    setFilterValue({
      ...filterValue,
      endDate
    });

    const appliedIndex = appliedFilters.findIndex(f => f.type === 'endDate');

    if (appliedIndex > -1) {
      appliedFilters[appliedIndex] = { type: 'endDate', currentValue: endDate };
      applyFilterToTrips(appliedFilters);
    }
  }

  const changeFilterUser = e => {
    const user = e.target.value;

    setFilterValue({
      ...filterValue,
      user
    });

    const appliedIndex = appliedFilters.findIndex(f => f.type === 'user');

    if (appliedIndex > -1) {
      appliedFilters[appliedIndex] = { type: 'user', currentValue: user };
      applyFilterToTrips(appliedFilters);
    }
  }

  const changeCheck = (e, type) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const currentValue = filterValue[type];
      appliedFilters.push({ type, currentValue });
      setAppliedFilters(appliedFilters);
      applyFilterToTrips(appliedFilters);
    } else {
      const newFilters = appliedFilters.filter(filter => filter.type !== type);
      setAppliedFilters(newFilters); 
      applyFilterToTrips(newFilters);
    }

    filterChecked[type] = isChecked;
    setFilterChecked(filterChecked);
  }

  const applyFilterToTrips = (filtersToApply) => {
    if (filtersToApply.length < 1) {
      setFilteredTrips([]);
    }

    let filtered = trips;

    filtersToApply.forEach(filter => {
      if (filter.type === 'startDate') {
        filtered = filtered.filter(trip => trip[filter.type] >= filter.currentValue);
        return;
      } else if (filter.type === 'endDate') {
        filtered = filtered.filter(trip => trip[filter.type] <= filter.currentValue);
        return;
      } else if (filter.type === 'user') {
        filtered = filtered.filter(trip => trip.user['_id'] === filter.currentValue);
        return;
      }

      filtered = filtered.filter(trip => {
        return trip[filter.type] === filter.currentValue
      })
    });

    setFilteredTrips(filtered);
  }

  const renderOptionInput = ({ label, value }) => {
    switch (value) {
      case 'destination':
        if (!destinations || destinations.length < 1) {
          return <div key={value}></div>;
        }

        return (
          <div className={classes.filterOptions} key={value}>
            <Checkbox color="primary" checked={filterChecked.destination} onChange={e => changeCheck(e, value)} />
            <Typography variant="body1" component="span">{label}</Typography>
            <Select
              className={classes.textField}
              value={filterValue.destination}
              onChange={changeFilterDestination}
            >
              <MenuItem value="">None</MenuItem>
              {destinations.map(d => <MenuItem key={d._id} value={d.name}>{d.name}</MenuItem>)}
            </Select>
          </div>
        );
      case 'startDate':
        return (
          <div className={classes.filterOptions} key={value}>
            <Checkbox color="primary" checked={filterChecked.startDate} onChange={e => changeCheck(e, value)} />
            <Typography variant="body1" component="span">{label} From:</Typography>
            <form className={classes.datePicker}>
              <TextField
                id="startDate"
                type="date"
                defaultValue={new Date().toISOString().substring(0, 10)}
                className={classes.textField}
                onChange={changeFilterStartDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
        );
      case 'endDate':
        return (
          <div className={classes.filterOptions} key={value}>
            <Checkbox color="primary" checked={filterChecked.endDate} onChange={e => changeCheck(e, value)} />
            <Typography variant="body1" component="span">{label} To:</Typography>
            <form className={classes.datePicker}>
              <TextField
                id="endDate"
                type="date"
                defaultValue={new Date().toISOString().substring(0, 10)}
                className={classes.textField}
                onChange={changeFilterEndDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
        );
      case 'user':
        return (
          <div className={classes.filterOptions} key={value}>
            <Checkbox color="primary" checked={filterChecked.user} onChange={e => changeCheck(e, value)} />
            <Typography variant="body1" component="span">{label}</Typography>

            <Select
              className={classes.textField}
              value={filterValue.user}
              onChange={changeFilterUser}
            >
              <MenuItem value="">None</MenuItem>
              {userFilterOptions.map(user => <MenuItem key={user.value} value={user.value}>{user.label}</MenuItem>)}
            </Select>
          </div>
        );
      default:
        return <></>;
    }
  }

  const resetFilters = () => {
    setAppliedFilters([]);

    setFilterChecked({
      destination: false,
      startDate: false,
      endDate: false,
      user: false,
    });
  }

  const renderFilterOptions = () => {
    return (
      <Accordion className={classes.filterWrap}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography variant="h5" component="span">Filters</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.filterOptionWrap}>
          {
            filterOptions.map(option =>
              renderOptionInput(option)
            )
          }
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" className={classes.filterResetButton} onClick={resetFilters}>
            Reset Filters
          </Button>
        </AccordionActions>
      </Accordion>
    )
  }

  return (
    <CardContent className={classes.root}>
      <CardBar />

      <Grid className={classes.filterWrap} container spacing={2} direction="row">
        {renderFilterOptions()}
      </Grid>

      <Grid className={classes.tripWrap} container spacing={2} direction="row" justify="flex-start">
        {renderTrips()}
      </Grid>

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
  )
}

export default connect(state => ({
  auth: state.auth,
  userDetail: state.userDetail,
}))(Browse);
