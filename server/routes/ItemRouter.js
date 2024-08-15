const express = require('express');
const router = express.Router();
const {addItem, listItems, updateItem} = require('../controllers/ItemController');

router.post('/add', addItem);
router.post('/get', listItems);
router.post('/update', updateItem);


module.exports=router;