
const { errorOut } = require('firebase-tools');
const Tutor = require('../model/tutor');
const bcrypt = require('bcrypt');
const MatchedTutor = require('../model/TutorMatch');
const { getTutorToken } = require('../func/getToken');
exports.signup = async (req, res, next) => {
    const phoneNmuber = req.body.phoneNumber;
    const email = req.body.email;
    const password = req.body.password;
    const hpwd = await  bcrypt.hash(password, 12);
    const education = req.body.education;
    const experience = req.body.experience;
    const address = req.body.address;
    const selectedClass = req.body.selectedClass;
    const subjects = req.body.subjects;
    const mode = req.body.mode;
    try {
        const tutor = new Tutor(phoneNmuber, email, hpwd, education, experience, address , selectedClass , subjects, mode);
        await tutor.save();
        res.status(200).json({
            message: 'Tutor Successfully added'
        });     
    } catch (error){
        console.log(error);
        if(error.errno === 1062){
            res.status(406).json({
                message: 'User Already Exist'
            }); 
            return;
        }
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}
exports.login = async (req, res, next) => {
    const phone = req.body.phoneNumber;
    const password = req.body.password;
    const data = await Tutor.find(phone);
    if(data[0].length < 1){
        res.statusCode = 401;
        res.send({
            message: 'User not exist'
        })
        return ;
    }
    const token = getTutorToken(phone, data[0][0].email);
    const result = await bcrypt.compare(password, data[0][0].password);
    if(!result){
        res.statusCode = 401;
        res.send({
            message: 'Wrong password'
        })
        return ;
    }
    res.statusCode = 200;
    res.send({
        token,
        message: 'Successfully Logged In'
    });
}
exports.tutorPostApplied = async (req, res, next) => {
    try{
        const studentPhoneNumber = req.body.studentPhoneNumber;
        const studentrequirementId = req.body.studentrequirementId;
        await MatchedTutor.tutorApplied(req.phoneNumber, studentPhoneNumber, studentrequirementId);
        res.status(200).json({
            data: "Successfully Applied Classes"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}

exports.classesAvailable = async (req, res, next) => {
    try{
        const response = await Tutor.getClassesAvailable();
        res.status(200).json({
            data: response[0]
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    } 
}

exports.tutorApplied = async (req, res, next) =>{
    try{
        const postApplied = await MatchedTutor.matchedRequiredStudent(req.phoneNumber);
        res.status(200).json({
            data: postApplied[0]
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}

exports.passwordUpdate = async (req, res, next) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.password;
    const hashpw = await bcrypt.hash(newPassword, 12);
    try{
        const tutorData = await Tutor.find(req.phoneNumber);
        const dataPassword = tutorData[0][0].password;
        const isOldPasswordSame = await bcrypt.compare(oldPassword, dataPassword);
        if(!isOldPasswordSame){
            res.status(401).json({
                data: 'Wrong Password'
            }) 
            return;
        }
        const response = await Tutor.updatePassword(req.phoneNumber, hashpw);
        res.status(200).json({
            data: 'Successfully Updated Password'
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}