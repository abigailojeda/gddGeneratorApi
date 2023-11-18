const { response } = require('express');
const GddModel = require("../models/Gdd.model");

//create project
const createGdd = async (req, res) => {
  const { project_name } = req.body;

  try {
    // GddModel
    const dbGdd = new GddModel(req.body);

    await dbGdd.save();

    // Response
    return res.status(201).json({
      ok: true,
      msg: 'GDD created',
      project_name
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error creating GDD'
    });
  }
}

function getAllUserGdds(req, res) {
  const user_id = req.params.id;

  return GddModel.find({
    $or: [{ user_id: user_id }]
  })
    .then((gdds) => {
      return res.send(gdds);
    })
    .catch((error) => {
      console.error(error);
      return res.send(error);
    });
}

//get project info
function getGddById(req, res) {
  return GddModel.findById(req.params.id)
    .then((gdd) => {
      return res.send(gdd);
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).send(err);
    });
}

//update project
function updateGddById(req, res) {
  return GddModel.findByIdAndUpdate(req.params.id, req.body)
    .then((gdd) => {
      return res.send(gdd);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(err);
    });
}

//change project title
function updateGddTitleById(req, res) {
    const { project_name } = req.body;
  
    if (!project_name) {
      return res.status(400).json({
        ok: false,
        msg: 'No new project title provided'
      });
    }
  
    return GddModel.findByIdAndUpdate(req.params.id, { project_name }, { new: true })
      .then((updatedGdd) => {
        return res.send(updatedGdd);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send(err);
      });
  }

//delete project
function deleteGddById(req, res) {
  return GddModel.findByIdAndRemove(req.params.id)
    .then((gdd) => {
      return res.send(gdd);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(err);
    });
}

//get gameItem
function getGameItemById(req, res) {
    return GddModel.findOne({ 'gameItems._id': req.params.itemId })
      .then((gdd) => {
        if (!gdd) {
          return res.status(404).json({
            ok: false,
            msg: 'GDD not found'
          });
        }
  
        const gameItem = gdd.gameItems.find(item => item._id.toString() === req.params.itemId);
        if (!gameItem) {
          return res.status(404).json({
            ok: false,
            msg: 'GameItem not found'
          });
        }
  
        return res.send(gameItem);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send(err);
      });
  }
//update gameItem
function updateGameItemById(req, res) {
    const updateData = req.body;
  
    if (!updateData || (Object.keys(updateData).length === 0 && updateData.constructor === Object)) {
      // Si no hay datos de actualización, devolver un mensaje de error
      return res.status(400).json({
        ok: false,
        msg: 'No data provided for update'
      });
    }
  
    return GddModel.findOne({ 'gameItems._id': req.params.itemId })
      .then((gdd) => {
        if (!gdd) {
          return res.status(404).json({
            ok: false,
            msg: 'GDD not found'
          });
        }
  
        const gameItem = gdd.gameItems.find(item => item._id.toString() === req.params.itemId);
        if (!gameItem) {
          return res.status(404).json({
            ok: false,
            msg: 'GameItem not found'
          });
        }
  
        // Actualizar solo si hay datos válidos
        Object.assign(gameItem, updateData);
  
        return gdd.save()
          .then(updatedGdd => res.send(updatedGdd.gameItems.find(item => item._id.toString() === req.params.itemId)))
          .catch(err => {
            console.error(err);
            return res.status(500).send(err);
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send(err);
      });
  }

//delete gameItem
function deleteGameItemById(req, res) {
    return GddModel.findOne({ 'gameItems._id': req.params.itemId })
      .then((gdd) => {
        if (!gdd) {
          return res.status(404).json({
            ok: false,
            msg: 'GDD not found'
          });
        }
  
        const gameItemIndex = gdd.gameItems.findIndex(item => item._id.toString() === req.params.itemId);
        if (gameItemIndex === -1) {
          return res.status(404).json({
            ok: false,
            msg: 'GameItem not found'
          });
        }
  
        // Eliminar el GameItem del array
        gdd.gameItems.splice(gameItemIndex, 1);
  
        return gdd.save()
          .then(() => res.json({ ok: true, msg: 'GameItem deleted' }))
          .catch(err => {
            console.error(err);
            return res.status(500).send(err);
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send(err);
      });
  }

module.exports = {
  createGdd,
  getAllUserGdds,
  getGddById,
  updateGddById,
  deleteGddById,
  updateGddTitleById,
  getGameItemById,
  updateGameItemById,
  deleteGameItemById
}
