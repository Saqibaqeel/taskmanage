const mongoose = require('mongoose');
const Board = require('../models/boardSchema');


const createBoard = async (req, res) => {
    try {
        const { name, description } = req.body;
        const ownerId = req.user._id; // Assuming user info is added to req in auth middleware  
        if (!name) {
            return res.status(400).json({ msg: 'Board name is required' });
        }
        const newBoard = new Board({ name, owner: ownerId, description });
        await newBoard.save();
        res.status(201).json({ msg: 'Board created successfully', board: newBoard, });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

const getBoards = async (req, res) => {
    try {
        const ownerId = req.user._id; // Assuming user info is added to req in auth middleware  
        const boards = await Board.find({ owner: ownerId });
        res.status(200).json({ boards });
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};
const getAllBoards = async (req, res) => {
    try {
        const boards = await Board.find();
        res.status(200).json({ boards });
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }   
};
const updateBoard = async (req, res) => {
    try{
       const { boardId } = req.params;
       const { name } = req.body;
       const board = await Board.findById(boardId);
         if (!board) {
            return res.status(404).json({ msg: 'Board not found' });
        }
        board.name = name || board.name;
        await board.save();
        res.status(200).json({ msg: 'Board updated successfully', board });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}
const deleteBoard = async (req, res) => {
    try{
         const { boardId } = req.params;
            const board = await Board.findByIdAndDelete(boardId);
            if (!board) {
                return res.status(404).json({ msg: 'Board not found' });
            }
            res.status(200).json({ msg: 'Board deleted successfully' });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }

}

module.exports = { createBoard, getBoards, getAllBoards, updateBoard, deleteBoard };
