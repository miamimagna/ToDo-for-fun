const Item = require('../models/Items');

module.exports.addItem = async (req, res, next) => {
    try{
        var {title, desc, owner} = req.body;
        owner??='miamimagna';
        const item = new Item({title, desc, owner});
        await item.save();
        res.status(200).json({success: true, message: 'item added successfully'});
        next();
    }catch(err){
        console.log(err);
        res.status(400).send({success: false, message: 'something is wrong in insertion'});
    }
} 

module.exports.listItems = async(req, res, next) => {
    try{
        const {owner} = req.body;
        if(owner){
            const items = await Item.find({owner}).select('title desc createdAt').exec();
            res.status(200).json({success: true, message: items});
        }
        else res.status(400).json({success: false, message: 'not correct id'});
    }catch(err) {
        console.log(err);
        res.status(400).json({success: false, message: 'not listed'});
    }
}

module.exports.updateItem = async(req, res, next) => {
    try{
        const {_id, title, desc} = req.body;
        if(_id && title.length > 0){
            const ress = await Item.findOneAndUpdate({_id}, {title, desc});
            res.status(200).json({success: true, message: ress});
        }
        else res.status(400).json({success: false, message: 'something went wrong with update'});
    }catch(err){
        console.log(err);
        res.status(400).json({success: false, message: 'invalid'});
    }
}