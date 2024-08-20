const express = require('express');
const router = express.Router();
const {addItem, listItems, updateItem, deleteItem} = require('../controllers/ItemController');
const AuthChecker = require('../middleware/AuthChecker');

router.post('/add', AuthChecker, addItem);
router.post('/get', AuthChecker, listItems);
router.post('/update', AuthChecker, updateItem);
router.post('/delete', AuthChecker, deleteItem);


module.exports=router;