const User = require('../models/userModel');
const mongoose = require('mongoose');


const makeAdim = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (user.role === 'admin') {
            return res.status(400).json({ msg: 'User is already an admin' });
        }
        user.role = 'admin';
        await user.save();
        res.status(200).json({ msg: 'User promoted to admin successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
        
    }

}
const makeEditor = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (user.role === 'editor') {
            return res.status(400).json({ msg: 'User is already an editor' });
        }
        user.role = 'editor';
        await user.save();
        res.status(200).json({ msg: 'User promoted to editor successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }

}

const makeViewer = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (user.role === 'viewer') {
            return res.status(400).json({ msg: 'User is already a viewer' });
        }
        user.role = 'viewer';
        await user.save();
        res.status(200).json({ msg: 'User demoted to viewer successfully', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = {
    makeAdim,
    makeEditor,
    makeViewer
};
