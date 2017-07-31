'use strict';

import express from 'express';
import morgan from 'morgan';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import config from './config';
import initDB from './config/init';

import apiArticle from './api/article';
import apiSearch from './api/search';

var connection = mongoose.connect(config.mongo.uri, config.mongo.options);

/**
 * Init database
 */
initDB();

var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './client')));

app.use('/api/search', apiSearch);
app.use('/api/articles', apiArticle);

app.listen(9000);

