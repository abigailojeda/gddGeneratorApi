const { Router } = require('express');
const {
  createGdd,
  getAllUserGdds,
  getGddById,
  updateGddById,
  deleteGddById,
  updateGddTitleById,
  getGameItemById,
  updateGameItemById,
  deleteGameItemById
} = require('../controllers/gdd.controller');

const router = Router();

router.post('/:id', createGdd);

router.get('/:id', getAllUserGdds);

router.get('/detail/:id', getGddById);

router.put('/:id', updateGddById);

router.patch('/title/:id', updateGddTitleById);

router.delete('/:id', deleteGddById);

router.get('/gameitem/:itemId', getGameItemById);

router.put('/gameitem/:itemId', updateGameItemById);

router.delete('/gameitem/:itemId', deleteGameItemById);

module.exports = router;
