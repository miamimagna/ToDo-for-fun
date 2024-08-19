const Item = require('../models/Items');

module.exports.addItem = async (req, res, next) => {
    try{
        var {title, desc, owner} = req.body;
        owner??='miamimagna';
        const createdAt= new Date();
        const item = new Item({title, desc, owner, createdAt});
        await item.save();
        res.status(200).json({success: true, message: item});
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
        console.log(req.body);
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

module.exports.deleteItem = async(req, res, next) => {
    try{
        const {_id} = req.body;
        if(_id){
            const ress = await Item.findByIdAndDelete(_id);
            res.status(200).json({success: true, message: ress});
        }
        else res.status(400).json({success: false, message: 'bro galat id mat do'});
    }catch(err){
        console.log(err);
        res.status(400).json({success: false, message: 'patani delete nai hua'});
    }
}