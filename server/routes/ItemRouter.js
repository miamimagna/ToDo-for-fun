const express = require('express');
const router = express.Router();
const {addItem, listItems, updateItem, deleteItem} = require('../controllers/ItemController');

router.post('/add', addItem);
router.post('/get', listItems);
router.post('/update', updateItem);
router.post('/delete', deleteItem);


module.exports=router;