const jwt = require('jsonwebtoken');

exports.getStudentToken = (phoneNumber, email) => {
    const token = jwt.sign({
        phone: phoneNumber,
        email: email
    },'studentComfortLearingWay', {expiresIn: '1h'});
    return token;
}

exports.getTutorToken = (phoneNumber, email) => {
    const token = jwt.sign({
        phone: phoneNumber,
        email: email
    },'TutorComfortClassesWay', {expiresIn: '1h'});
    return token;
}