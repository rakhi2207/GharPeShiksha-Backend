const db = require('../util/database');

const student= class Student{
    constructor(phoneNumber, email , password){
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }

    save(){
        return db.execute(
            `Insert into student (phoneNumber, email, password) Values(?,?,?)`,
            [this.phoneNumber, this.email, this.password]
        );
    }

    static find(phoneNumber){
        const studentData = db.execute(
            `Select * from student where phoneNumber = '${phoneNumber}'`
        );
        return studentData;
    }

    static updatePassword(phoneNumber, password){
        return db.execute(
            `Update student Set password = ? where phoneNumber = ?`,
            [password, phoneNumber]
        );
    }
}

module.exports = student;