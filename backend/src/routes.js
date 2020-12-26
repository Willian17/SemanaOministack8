const express = require('express');
const DeslikeController = require('./controllers/DeslikeController');
const DevController = require('./controllers/DevController');
const LikeControler = require('./controllers/LikeControler');

const routes = express.Router();


routes.post('/devs' , DevController.store)
routes.get('/devs' , DevController.index)
routes.post('/devs/:devId/like' , LikeControler.store)
routes.post('/devs/:devId/deslike' , DeslikeController.store)

module.exports = routes