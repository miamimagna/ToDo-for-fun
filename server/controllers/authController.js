const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports.SignUp = async (req, res, next) => {
    const {username, password, name} = req.body;
    if(!username || !password || !name || username.length < 3 || password.length < 6 || name.length < 3)
        res.status(400).json({
            success: false,
            message: 'invalid details entered'
        });
    try{
        const ress = await User.findOne({username}).exec();
        if(ress) 
            return res.status(409).json({
                success: false,
                message: 'user already exist'
            })
        const hashPwd = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
        const user = new User({username, password: hashPwd, name});
        await user.save();
        console.log('user saved with username:', username);
        const token = jwt.sign({username, name}, 
                                process.env.JWT_PRIVATE, 
                                {
                                    algorithm: 'RS256', 
                                    expiresIn: '1d'
                                });
        res.cookie('token', token, {
            withCredetials: true, 
            httpOnly: false,
        });
        res.status(201).json({
            success: true,
            message: token
        })
    }catch(err){
        console.log('error in signup: ', err);
        res.status(400).json({
            success: false,
            message: 'something went wrong with signup'
        })

    }
}

module.exports.Login = async(req, res, next) => {
    try{
        const {username, password} = req.body;
        if(!username || !password)
            return res.status(400).json({
            success: false,
            message: 'invalid details entered: no entry'
            });
        const user = await User.findOne({username}).exec();
        if(!user) 
            return res.status(400).json({
            success: false,
            message: 'invalid details entered: wrong entry'
            });
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid)
            return res.status(400).json({
            success: false,
            message: 'invalid details entered: wrong password'
            });
        const token = jwt.sign({username, name: user.name}, 
                                process.env.JWT_PRIVATE, 
                                {
                                    algorithm: 'RS256', 
                                    expiresIn: '1d'
                                });    
        
        res.cookie('token', token, {
            withCredetials: true, 
            httpOnly: false,
        });
        res.json({
            success: true,
            message: token
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong with login'
        });
    }
}

module.exports.Update = async(req, res, next) => {
    try{
        const {username, password, newName, newPassword} = req.body;
        // if fields are empty
        if(!username || !password || !newName || !newPassword)
            return res.status(400).json({
            success: false,
            message: 'invalid details entered'
            });
        // find the user, if not send error
        const user = await User.findOne({username}).exec();
        if(!user) 
            return res.status(400).json({
            success: false,
            message: 'invalid details entered'
            });
        // verify password
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid)
            return res.status(400).json({
            success: false,
            message: 'invalid details entered'
            });
        // update
        const hashPwd = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT));
        const ress = await User.findByIdAndUpdate(user._id, {username: newName, password: hashPwd});
        res.status(200).json(ress);
    }catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'Something went wrong with update'
        })
    }
}

module.exports.Logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({success: true, message: 'logged out!'});
}