const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://login:6ohAZ2IvNZoECmVC@cluster0.cpm0j.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

const port = 3333
server.listen(port, ()=> {
    console.log(`server listening of port ${port}`)
})