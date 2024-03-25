const db = require('../util/database');

const tutor= class Tutor{
    constructor(phoneNumber, email , password, education, experience, address, selectedClass, subjects, mode){
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.education = education;
        this.experience = experience;
        this.address = address;
        this.selectedClass = selectedClass;
        this.subjects = subjects;
        this.mode = mode;
    }

    save(){
        return db.execute(
            `Insert into Tutor (phoneNumber, email, password, education, experience, address, selectedClass, subjects, mode) Values(?,?,?,?,?,?,?,?,?)`,
            [this.phoneNumber, this.email, this.password, this.education, this.experience, this.address, this.selectedClass, this.subjects, this.mode]
        );
    }

    static find(phoneNumber){
        const tutorData = db.execute(
            `Select * from tutor where phoneNumber = ${phoneNumber}`
        );
        return tutorData;
    }

    static getClassesAvailable(){
        return db.execute(`Select * from studenttutorrequirement`);
    }
    static updatePassword(phoneNumber, password){
        return db.execute(
            `Update tutor Set password = ? where phoneNumber = ?`,
            [password, phoneNumber]
        );
    }
}

module.exports = tutor;