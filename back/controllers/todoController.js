
const Todo = require('../models/Todo')
const mongoose = require('mongoose')

const getTodos = async (req, res) => {
  const user_id=req.user._id
  const Task = await Todo.find({user_id}).sort({priority: -1})

  res.status(200).json(Task)
}

const getTodo = async (req, res) => {
  
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const Task = await Todo.findById(id)

  if (!Task) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(Task)
}


const createTodo = async (req, res) => {
    const {title, description, duedate, priority, status } = req.body;

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!duedate) {
    emptyFields.push('duedate')
  }
  if (!priority) {
    emptyFields.push('priority')
  }
  if (!status) {
    emptyFields.push('status')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const user_id=req.user._id
    const Task = await Todo.create({title, description, duedate, priority, status ,user_id})
    res.status(200).json(Task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const deleteTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Task'})
  }

  const Task = await Todo.findOneAndDelete({_id: id})

  if(!Task) {
    return res.status(400).json({error: 'No such Task'})
  }

  res.status(200).json(Task)
}


const updateTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const Task = await Todo.findOneAndUpdate({_id: id}, {
    ...req.body
  },{new:true})

  if (!Task) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(Task)
}

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo
}