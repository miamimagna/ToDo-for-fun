const mongoose = require('mongoose');
const {Schema} = mongoose;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    }, 
    owner: {
        type: String,
        required: true,
        default: 'miamimagna'
    }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;