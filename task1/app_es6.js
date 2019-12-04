class getDatabase{

    constructor(){
        this.students = {};
        this.subjects = {};
    }
    addStudent(personalId,student){
        student.personalId = personalId;
        this.students[personalId]= student;
        
    }
    getAllStudents(){
        console.log(this.students);
    }
    getStudentById(personalId){
        console.log(this.students[personalId])
    }
    updateStudent(personalId,newstudent) {
        newstudent.personalId = personalId;
        this.students[personalId] = newstudent;

    
    }
    removeStudent(personalId){
        if(!this.students[personalId]){
            console.log('not exist!');
        }
        delete this.students[personalId];
        
    }
    addSubject(code,title){
        this.subjects[code]={
            title,
            code : code
        };
    }
    getAllSubjects(){
        console.log(this.subjects);
    }
    addStudentToSubject(personalId,co){
        
        
        const nm = this.students[personalId]; 
        nm.code = co;      
        this.students[personalId] = nm;
               
    }
    getSubjectsForStudent(personalId){
        var subjectId = this.students[personalId].code;
        console.log(subjectId);
    }

}

const data = new getDatabase();

data.addStudent('123',{
    name: 'joh',
    surname: 'doe',
});
data.addStudent('124',{
    name: 'asd',
    surname: 'dasdoe',
});
data.updateStudent('123',{
    name: 'joh',
    surname: 'doe[asdasd]',
});
//Remove student by personalId
//data.removeStudent(123);

data.getAllStudents();
data.addSubject('something','javascript');
data.getAllSubjects();
data.getStudentById(124);
data.addStudentToSubject('124','something');
data.getAllStudents();
data.getSubjectsForStudent('124');


