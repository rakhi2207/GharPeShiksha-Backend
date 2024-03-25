const db = require('../util/database');

const student= class Student{
    constructor(phoneNumber, studyClass, subject , mode, address, noOfClasses, budget){
        this.phoneNumber = phoneNumber;
        this.studyClass = studyClass;
        this.subject = subject;
        this.mode = mode;
        this.address = address;
        this.noOfClasses = noOfClasses;
        this.budget = budget;
    }

    save(){
        return db.execute(
            `Insert into studenttutorrequirement (phoneNumber, studyClass, subjects, mode, address, noOfClass, budget) Values(?,?,?,?,?,?,?)`,
            [this.phoneNumber, this.studyClass, this.subject, this.mode, this.address, this.noOfClasses, this.budget]
        );
    }

    static findMatchedTutor(studyClass, subject){
        const tutorData = db.execute(
            `Select * from tutor where selectedClass = '${studyClass}' and subjects LIKE '%${subject}%'` 
        );
        return tutorData;
    }

    static tutorRequirement(studentPhoneNumber){
        return db.execute(`Select * from studenttutorrequirement where phoneNumber = ${studentPhoneNumber}`);
    }
}

module.exports = student;