const Router = require('express').Router();
const protected = require('../middleware/protected');
const { makeAdim, makeEditor, makeViewer } = require('../controllers/adminController');
Router.put('/make-admin/:userId', protected, makeAdim);
Router.put('/make-editor/:userId', protected, makeEditor);
Router.put('/make-viewer/:userId', protected, makeViewer);
module.exports = Router;