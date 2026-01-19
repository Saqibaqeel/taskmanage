const Router = require('express').Router();
const protected = require('../middleware/protected');
const { createBoardList, getBoardLists, updateBoardList, deleteBoardList } = require('../controllers/boardListController');
Router.post('/create/:boardId', protected, createBoardList);
Router.get('/:boardId', protected, getBoardLists);
Router.put('/update/:boardListId', protected, updateBoardList);
Router.delete('/delete/:boardListId', protected, deleteBoardList);
module.exports = Router;