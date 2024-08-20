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
        const token = jwt.sign({username}, 
                                process.env.JWT_PRIVATE, 
                                {
                                    algorithm: 'RS256', 
                                    expiresIn: '1d'
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