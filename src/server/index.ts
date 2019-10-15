import dotenv from 'dotenv';
dotenv.config();

import App from './app';
import { connect } from './database';

const app = new App();
connect();

app.start();