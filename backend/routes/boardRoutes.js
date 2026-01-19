const Router = require('express').Router();
const { createBoard, getBoards, getAllBoards, updateBoard, deleteBoard  } = require('../controllers/boardController');
const protected = require('../middleware/protected');

Router.get('/allboards', getAllBoards);
Router.post('/create-boards', protected, createBoard);
Router.get('/:id', protected, getBoards);
Router.put('/boards/:boardId', protected, updateBoard);
Router.delete('/boards/:boardId', protected, deleteBoard);
module.exports = Router;