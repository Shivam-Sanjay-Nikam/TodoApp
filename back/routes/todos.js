
const express = require('express')
const {
    getTodo,
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todoController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)
router.get('/', getTodos)

router.get('/:id', getTodo)

router.post('/', createTodo)

router.delete('/:id', deleteTodo)

router.patch('/:id', updateTodo)

module.exports = router