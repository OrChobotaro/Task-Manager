require('dotenv').config();
 
const express = require('express');
const tasksRoutes = require('./routes/tasks');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/tasks', tasksRoutes);

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

