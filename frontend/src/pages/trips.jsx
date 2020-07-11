import React from 'react';
import {
  CardContent,
  Typography,
  Fab,
  Paper,
  Card,
  CardMedia,
  CardActionArea,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/trips.css';
import CardBar from '../components/cardBar';

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
  eventWrap: {
    padding: '10px 15px',
    background: theme.palette.grey[300],
    overflowY: 'scroll',
    width: '100%',
    minHeight: 340,
    whiteSpace: 'nowrap'
  },
  eventCard: {
    display: 'inline-block',
    maxWidth: 400,
    minHeight: 300,
    margin: '10px 15px'
  },
  seeAllCard: {
    display: 'inline-block',
    width: 300,
    minHeight: 300,
    margin: '10px 15px',
    background: 'rgba(33, 150, 254, 0.3)',
    border: '3px #2196F4 dashed'
  },
  seeAllButton: {
    height: 'fill-available'
  },
  seeAllButtonText: {
    color: '#215590',
    textAlign: 'center'
  }
}));

const Trips = () => {
  const classes = useStyles();

  return (
    <CardContent className={classes.root}>
      <CardBar />

      <Typography className={classes.sectionTitle} variant="h4">Upcomming Trips!</Typography>

      <Paper className={classes.eventWrap}>
        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        
        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        
        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        
        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.seeAllCard} variant="outlined">
          <CardActionArea className={classes.seeAllButton}>
            <Typography className={classes.seeAllButtonText} variant="h5">See All</Typography>
          </CardActionArea>
        </Card>
      </Paper>

      <Typography className={classes.sectionTitle} variant="h4">Plans for next month(Aug 2020)</Typography>
      <Paper className={classes.eventWrap}>
        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        
        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        
        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        
        <Card className={classes.eventCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1525177089949-b1488a0ea5b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              height="200"
              title="image-title"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">Yellowknike</Typography>

              <Typography variant="body1" color="textSecondary" component="p">
                2020-07-12 ~ 2020-07-14 (3 days)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.seeAllCard} variant="outlined">
          <CardActionArea className={classes.seeAllButton}>
            <Typography className={classes.seeAllButtonText} variant="h5">See All</Typography>
          </CardActionArea>
        </Card>
      </Paper>

      <Fab id="fab-create-plan" className={classes.createButton} aria-label="add">
        <AddIcon />
      </Fab>
    </CardContent>
  );
}

export default Trips;