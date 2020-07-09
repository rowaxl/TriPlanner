import React from 'react';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Paper, Container, Card } from '@material-ui/core';
import './styles/App.css';
import Index from './pages/index';
import Trips from './pages/trips';

const App = ({ location }) => {
  return (
    <Paper id="background" square>
      <Container id="app-container" maxWidth="xl">
        <Card id="app-base-card">
          <TransitionGroup className="transition-group">
            <CSSTransition
              key={ location.key }
              timeout={{ enter: 300, exit: 300 }}
              classNames={'fade'}
            >
              <section className="route-section">
                <Switch location={location}>
                  <Route exact path="/">
                    <Index />
                  </Route>
                  <Route path="/trips">
                    <Trips />
                  </Route>
                </Switch>
              </section>
            </CSSTransition>
          </TransitionGroup>
        </Card>
      </Container>
    </Paper>
  );
}

export default withRouter(App);
