const {Router} = require('express');
const { createProject, getAllUserProjects, getProjectById, updateProjectById, deleteProjectById } = require('../controllers/project.controller');

const router = Router();

//create project
router.post('/',  createProject);

//get all projects
router.get('/:id',  getAllUserProjects);

//get a project
router.get('/detail/:id',  getProjectById);

//update project
router.put('/:id',  updateProjectById);

//delete project
router.delete('/:id',  deleteProjectById);

module.exports = router;