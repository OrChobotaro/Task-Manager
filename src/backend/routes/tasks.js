const express = require('express');
const Task = require('../models/TasksModel')
const mongoose = require('mongoose');

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// POST a new task
router.post('/', async (req, res) => {
    const {title, isDone} = req.body;
    try {
        const task = await Task.create({title, isDone});
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// DELETE task
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'});
    }
    
    const task = await Task.findOneAndDelete({_id: id});

    if (!task) {
        return res.status(400).json({error: 'No such task'});
    }

    res.status(200).json(task);
})


// UPDATE task
router.patch('/:id', async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'});
    }

    const task = await Task.findOneAndUpdate({_id:id}, {isDone:1})

    if (!task) {
        return res.status(400).json({error: 'No such task'});
    }

    res.status(200).json(task);
})

module.exports = router;
