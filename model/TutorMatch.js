const db = require('../util/database');

const student= class Student{
    constructor(tutorPhoneNumber, studentPhoneNumber, tutorApplied ,  studentApplied){
        this.tutorPhoneNumber = tutorPhoneNumber;
        this.studentPhoneNumber = studentPhoneNumber;
        this.tutorApplied = tutorApplied;
        this.studentApplied = studentApplied;
    }

    save(){
        return db.execute(
            `Insert into matchedtutorstudent (tutorPhoneNumber, studentPhoneNumber, tutorApplied, studentApplied) Values(?,?,?,?)`,
            [this.tutorPhoneNumber, this.studentPhoneNumber, this.tutorApplied, this.studentApplied]
        );
    }

    static async matchedRequiredTutorDetails(studentPhoneNumber){
        const response =  await db.execute(`Select * from matchedtutorstudent where studentPhoneNumber = ${studentPhoneNumber} and tutorApplied = 't'`);
        const tutorPhoneNumber = [];
        const data = [];
        if(response[0].length > 0 ){
            for(const data of response[0]){
                tutorPhoneNumber.push({
                    tutorPhoneNumber: data.tutorPhoneNumber,
                    requirementid: data.requirementid
                });
            }
            for(const tutorDetails of tutorPhoneNumber){
                const tutorData = await db.execute(`Select * from tutor where phoneNumber  = ${tutorDetails.tutorPhoneNumber}`);
                tutorData[0][0].requirementid = tutorDetails.requirementid;
                data.push(...tutorData[0]);
            }
            return data;
        }
        return [];
    }
    static async matchedRequiredTutor(studentPhoneNumber){
        return await db.execute(`Select * from matchedtutorstudent where studentPhoneNumber = ${studentPhoneNumber}`);
    }
    static async matchedRequiredStudent(tutorPhoneNumber){
        return await db.execute(`Select * from matchedtutorstudent where tutorPhoneNumber = ${tutorPhoneNumber}`);
    }

    static async tutorApplied(tutorPhoneNumber, studentPhoneNumber, studentrequirementId){
        const response = await db.execute(`Select * from matchedtutorstudent where studentPhoneNumber = ${studentPhoneNumber} and tutorPhoneNumber = ${tutorPhoneNumber} and requirementid = ${studentrequirementId}`);
        if(response[0].length > 0){
            return db.execute(`Update  matchedtutorstudent set tutorApplied = 't' where studentPhoneNumber = ${studentPhoneNumber} and tutorPhoneNumber = ${tutorPhoneNumber} and requirementid = ${studentrequirementId}`);
        }
        return db.execute(`Insert into  matchedtutorstudent Values(?,?,?,?,?)`,
        [tutorPhoneNumber, studentPhoneNumber, 'f', 't', studentrequirementId]);
    }

    static async studentApplied(tutorPhoneNumber, studentPhoneNumber, studentrequirementId){
        const response = await db.execute(`Select * from matchedtutorstudent where studentPhoneNumber = ${studentPhoneNumber} and tutorPhoneNumber = ${tutorPhoneNumber} and requirementid = ${studentrequirementId}`);
        if(response[0].length > 0){
            return db.execute(`Update  matchedtutorstudent set studentApplied = 't' where studentPhoneNumber = ${studentPhoneNumber} and tutorPhoneNumber = ${tutorPhoneNumber} and requirementid = ${studentrequirementId}`);
        }
        return db.execute(`Insert into  matchedtutorstudent Values(?,?,?,?,?)`,
        [tutorPhoneNumber, studentPhoneNumber, 't', 'f',studentrequirementId]);
    }
}

module.exports = student;