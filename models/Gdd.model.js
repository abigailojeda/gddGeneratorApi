const { Schema, model } = require("mongoose");

const SubItemSchema = new Schema({
    id: String,
    img: String,
    name: String,
    description: String,
  });
  
  const GameItemSchema = new Schema({
    id: String,
    title: String,
    description: String,
    subitems: [SubItemSchema],
    category_id: String,
  });
  
  const GddSchema = new Schema({
    user_id: String,
    project_name: String,
    description: String,
    gameItems: [GameItemSchema],
  });

module.exports = model('GDD', GddSchema)