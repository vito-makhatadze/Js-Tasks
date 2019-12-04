function getDatabase(){
            const students = {};
            const subjects = {};
            return{
                addStudent,
                updateStudent,
                getAllStudents,
                removeStudent,
                addSubject,
                getSubjects,
                getStudentById,
                addStudentToSubject,
                getSubjectsForStudent
            };
            function addStudent(personalId, student){
                student.personalId = personalId;
                students[personalId]= student
        
            }
            function getAllStudents(){
                console.log(Object.values(students));
        
            }
            function updateStudent(personalId,newstudent){
                  newstudent.personalId=personalId;
                  students[personalId]= newstudent;


            }
            function removeStudent(personalId){
                if (!students[personalId]){

                }
                delete students[personalId];

            }
            function addSubject(code, title){
                subjects[code] = {
                    title,
                    code : code
                    /* 
                    title : title    
                    code : code     -- Same
                    
                    [code]: code -- code-s change meaning
                    */
                };
            }
            function getSubjects(){
              console.log(Object.values(subjects));
            }
             for (var prop in object) { 
                if (object.hasOwnProperty(prop)) { 
                    if (object[prop] === value) 
                    return prop; 
                } 
            } 
            function getStudentById(personalId){
              
              if(!personalId){
                console.log('input personalId');
              }
              else if(students[personalId]===undefined){
                console.log('student is not exist');
              }
              else{
                console.log(students[personalId]);
              }
            }
            function addStudentToSubject(personalId,code){
              
              students[personalId].code = subjects[code];
            }
            function getSubjectsForStudent(personalId){
              var k = students[personalId].code;
              console.log(k);
            }

            
        }

        const database = getDatabase();
        
        const personalId = 0;
        database.addStudent('1234',{
            name: 'john',
            surname: 'Doe',
            age: 22 
        });
        database.addStudent('323',{
          name: 'vitali',
          surname: 'makhatadze',
          age: 21
        });
        
        //database.getAllStudents();

       database.addSubject('something','javascript')

        //database.getSubjects();
        

        
        
        database.updateStudent('1234',{
          name: 'goga',
          surname: 'gagua',
          age: 23
        }); 
        //database.removeStudent(personalId);
        
        
        
        //database.addSubject(code,title);
        //database.getSubjects();

        database.addStudentToSubject('1234','something');
        //database.getStudentById('1234');
        //database.getSubjects();
        
        database.getSubjectsForStudent('1234');


}
