'use strict'
import auth from './controllers/authController';
import cors from 'cors';

import userController from './controllers/userController';
import tripController from './controllers/tripController';

export default (app, opts) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(cors());

  app.use('/user', userController);

  app.use('/trip', auth, tripController);
}
