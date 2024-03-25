const bcrypt = require('bcrypt');
const Student = require('../model/student')
const StudentTutorReuqirement = require('../model/StudentTutorRequirement')
const MatchedTutor = require('../model/TutorMatch');
const { getStudentToken } = require('../func/getToken');
exports.signup = async (req, res, next) => {
    const phone = req.body.phoneNumber;
    const email = req.body.email;
    const password = req.body.password;
    const hashpw = await bcrypt.hash(password, 12);
    const student = new Student(phone, email, hashpw);
    try{
        await student.save();
        res.status(200).json({
            message: "Sucessfully created",
        });
    }catch(err){
        res.status(500).json({
            message: err,
        });
    }
}

exports.login = async (req, res, next) => {
    const phone = req.body.phoneNumber;
    const password = req.body.password;
    const data = await Student.find(phone);
    if(data[0].length < 1){
        res.statusCode = 401;
        res.send({
            message: 'User not exist'
        })
        return ;
    }
    const token = getStudentToken(phone, data[0][0].email);
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

exports.studentTutorRequirement = async (req, res, next) => {
    const studyClass = req.body.class;
    const subject = req.body.subjects;
    const mode = req.body.mode;
    const address = req.body.address;
    const noOfClasses = req.body.noOfClasses;
    const budget = req.body.budget;
    const st = new StudentTutorReuqirement(req.phoneNumber, studyClass, subject, mode, address,noOfClasses, budget);
    try{
        await st.save();
        res.status(200).json({
            message: "Sucessfully Added",
        });
    }catch(err){
        res.status(500).json({
            message: err,
        });
    }
}

exports.matchedTutor = async (req, res, next) => {
    const subject = req.body.subject;
    const studyClass = req.body.class;
    const requirementid = req.body.requirementId;
    console.log(requirementid);
    try{
        const matchingTutorResult = [];
        for(let i=0 ;i< subject.length;i++){
            const tutorData = await StudentTutorReuqirement.findMatchedTutor(studyClass[i], subject[i]);   
            if(tutorData[0].length > 0){
                for(const data of tutorData[0]){
                    data.requirementid = requirementid[i];
                }
                matchingTutorResult.push(...tutorData[0]);
            }
        }
        res.status(200).json({
            data: matchingTutorResult
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

exports.tutorRequirementPostApplied = async (req, res, next) => {
    try{
        const postApplied = await StudentTutorReuqirement.tutorRequirement(req.phoneNumber);
        res.status(200).json({
            data: postApplied[0]
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

exports.studentSelectedTutor = async (req, res, next) => {
    try{
        const tutorPhoneNumber = req.body.tutorPhoneNumber;
        const studentrequirementId = req.body.studentrequirementId;
        const postApplied = await MatchedTutor.studentApplied(tutorPhoneNumber, req.phoneNumber, studentrequirementId);
        res.status(200).json({
            data: "Successfully Student Applied"
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

exports.tutorAppliedDetails = async (req, res, next) =>{
    try{
        const postApplied = await MatchedTutor.matchedRequiredTutorDetails(req.phoneNumber);
        res.status(200).json({
            data: postApplied
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: error
        })
    }
}
exports.tutorApplied = async (req, res, next) =>{
    try{
        const postApplied = await MatchedTutor.matchedRequiredTutor(req.phoneNumber);
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
        const studentData = await Student.find(req.phoneNumber);
        const dataPassword = studentData[0][0].password;
        const isOldPasswordSame = await bcrypt.compare(oldPassword, dataPassword);
        if(!isOldPasswordSame){
            res.status(401).json({
                data: 'Wrong Password'
            }) 
            return;
        }
        const response = await Student.updatePassword(req.phoneNumber, hashpw);
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