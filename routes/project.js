'use strict'

let express = require('express');
let projectController = require('../controllers/project');
let router = express.Router();
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({uploadDir:'./uploads'});

router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/save-project', projectController.saveProject);
router.get('/project/:id?', projectController.getProject);
router.get('/projects', projectController.getProjects);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, projectController.uploadImage);
router.get('/get-image/:file', projectController.getImage)

module.exports = router;
