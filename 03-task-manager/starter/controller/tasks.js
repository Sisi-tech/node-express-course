const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (err) {
        console.error("There is an error while get all tasks: ", err);
        res.status(500).json({ message: "There was an error retrieving the data."});
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ message: "Task has been created successfully", task: task });
    } catch (err) {
        console.error("There is an error while creating a task: ", err);
        res.status(500).json({ message: "There was an error while creating the task."})
    }
}

const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ task });
    } catch (err) {
        console.error(`There is an error while looking for item with id: ${req.params.id}`, err);
        res.status(500).json({ message: `There was an error while looking for item with id ${req.params.id}`});
    }
    
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found "});
        }
        res.status(201).json({ task })
    } catch (err) {
        console.error(`There is an error while updating the task with id: ${req.params.id}`, err)
        res.status(500).json({ message: `There was an error while looking for item with id ${req.params.id}`});
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task successfully deleted" });
    } catch (err) {
        console.error(`There was an error while deleting task with id: ${req.params.id}`);
        res.status(500).json({ message: `There was an error while deleting item with id ${req.params.id}`});
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}