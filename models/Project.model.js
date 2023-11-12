const { Schema, model } = require("mongoose");



const TaskTagSchema = Schema({
    tag_text:{
        type:String
    },
    tag_color:{
        type:Number
    }
})
const TaskObjectiveSchema = Schema({
    objective_text:{
        type:String
    },
    objective_done:{
        type:Boolean
    }
})

const TaskSchema = Schema({
    task_title:{
        type:String
    },
    task_description:{
        type:String
    },
    objectives:[TaskObjectiveSchema],
    tags:[TaskTagSchema]
})

const CategorySchema = Schema({
    category_name:{
        type:String
    },
    task:[TaskSchema]
})


const ProjectSchema = Schema({
    user_id:String,
    project_name:{
        type:String
    },
    categories:[CategorySchema]
 
})

module.exports = model('Project', ProjectSchema)