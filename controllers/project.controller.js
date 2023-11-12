const {response} = require('express');
const Project = require("../models/Project.model")


const createProject = async(req,res)=>{

    const {project_name} = req.body;

    try {

    //Project model
    const dbProject = new Project(req.body);

    dbProject.save();

    //Response
    return res.status(201).json({
        ok:true,
        msg:'user created',
        project_name
    });
        
    } catch (error) {
        //console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'error creating project'
        })
    }

}


function getAllUserProjects(req, res){

    const user_id = req.params.id;

    return Project.find({
        $or: [{ user_id: user_id }]
    }) //find all users, puedes poner parametro o no.
      .then((users) => {
        return res.send(users);
      })
      .catch((error) => {
        //console.log(err)
        return res.send(error);
      });
}

//get one project 
function getProjectById(req,res){
  return Project.findById(req.params.id)
  .then((project)=>{
    return res.send(project);
  })
  .catch((err)=>{
    console.log(err)
    return res.status(404).send(err)
  })

}

//update project
function updateProjectById(req, res){
  return Project.findByIdAndUpdate(req.params.id, req.body)
  .then((project)=>{
    //console.log("updated");
    return res.send(project);
  })
  .catch((err) => {
    //console.log(error)
    return res.status(500).send(err);
  });
}


//delete project
function deleteProjectById(req,res){
  return Project.findByIdAndRemove(req.params.id)
  .then((project)=>{
    return res.send(project);
  })
  .catch((err) => {
    return res.status(500).send(err);
  });
}



module.exports = {
    createProject,
    getAllUserProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById
}