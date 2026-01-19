const BoardList = require('../models/boardList');
const mongoose = require('mongoose');


const createBoardList = async (req, res) => {
    try {
        const {boardId} = req.params;
        const { title, description, dueDate, labels } = req.body;
        const createdBy = req.user._id; // Assuming user info is added to req in auth middleware  
        if (!title || !boardId) {
            return res.status(400).json({ msg: 'Title and Board ID are required' });
        }
        const newBoardList = new BoardList({ title, boardId, description, dueDate, labels, createdBy });
        await newBoardList.save();
        res.status(201).json({ msg: 'Board List created successfully', boardList: newBoardList, });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

const getBoardLists = async (req, res) => {
    try {
        const { boardId } = req.params; 
        const boardLists = await BoardList.find({ boardId: boardId });
        res.status(200).json({ boardLists });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }   
};

const updateBoardList = async (req, res) => {
    try{
       const { boardListId } = req.params;
       const { title, description, dueDate, labels } = req.body;
       const boardList = await BoardList.findById(boardListId);
         if (!boardList) {
            return res.status(404).json({ msg: 'Board List not found' });
        }   
        boardList.title = title || boardList.title;
        boardList.description = description || boardList.description;
        boardList.dueDate = dueDate || boardList.dueDate;
        boardList.labels = labels || boardList.labels;
        await boardList.save();
        res.status(200).json({ msg: 'Board List updated successfully', boardList });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

const deleteBoardList = async (req, res) => { 
    try {
        const { boardListId } = req.params;
        const boardList = await BoardList.findByIdAndDelete(boardListId);
        if (!boardList) {
            return res.status(404).json({ msg: 'Board List not found' });
        }   
        res.status(200).json({ msg: 'Board List deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = { createBoardList, getBoardLists, updateBoardList, deleteBoardList };


