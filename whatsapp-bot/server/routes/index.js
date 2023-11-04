import { Router } from 'express';
import botRouter from './search';
import saveFeedback from '../controllers/saveFeedback'

const v1Router = Router();
v1Router.use('/api/v1', botRouter);
v1Router.post('/api/v1/feedback',saveFeedback);

export default v1Router;