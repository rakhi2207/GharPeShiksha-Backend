const jwt = require('jsonwebtoken');

exports.isStudentAuth = (req, res, next) => {
    const authorization = req.get('Authorization');
    if(!authorization){
        res.status(401).json({
            message: 'Not Authorized'
        })
    }
    const token = authorization.split(" ")[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'studentComfortLearingWay');
        if(!decodedToken){
            res.status(401).json({
                message: 'Not Authorized'
            })
        }else{
            req.phoneNumber = decodedToken.phone;
            next();
        }
    }catch(error){
        res.status(401).json({
            message: error
        })
    }
}
exports.isTutorAuth = (req, res, next) => {
    const authorization = req.get('Authorization');
    if(!authorization){
        res.status(401).json({
            message: 'Not Authorized'
        })
    }
    const token = authorization.split(" ")[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'TutorComfortClassesWay');
        if(!decodedToken){
            res.status(401).json({
                message: 'Not Authorized'
            })
        }else{
            req.phoneNumber = decodedToken.phone;
            next();
        }
    }catch(error){
        res.status(401).json({
            message: error
        })
    }
}