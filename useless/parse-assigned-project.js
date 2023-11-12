const json = require('./assigend-project.json');
const new_json = [];
const fs = require("fs");

console.log(typeof json);

json.forEach(element => {

    const name = element['First Name'] + ' ' + element['Last Name'];
    // console.log(element['assigned_project']);
    const project = element['assigned_project'].split('/')[4];
    // console.log(name, project);

    const entry = {
        name: name,
        email: element['Email'],
        mentor_name: element['mentor_name'],
        github: element['github'],
        mentor_email: element['mentor_email'],
        assigned_project: project
    }
    new_json.push(entry);
    // console.log(entry);
    
});

console.log(new_json);


const jsonString = JSON.stringify(new_json);
fs.writeFileSync('./newjson.json', jsonString);
// console.log(new_json);

new_json.sort((a, b) => {
    if(a.mentor_name > b.mentor_name) {
        return 1;
    }
    else {
        return -1;
    }
});

const mentorjs = require('../mentors.json');

const mentor = []

mentorjs.forEach(element1 => {
    const entry = {
        mentor_name: element1.name,
        mentor_email: '',
        mentees: []
    }
    mentor.push(entry);
});

// mentorjs.forEach(element1 => {
new_json.forEach(element2 => {
    // mentorjs.find(element => element.mentor_name === element2.mentor_name).mentees.push(element2);

    mentor.forEach(element => {
        if(element.mentor_name === element2.mentor_name) {
            console.log(element2);
            
            const student = {
                name: element2.name,
                email: element2.email,
                project: element2.assigned_project,
                github: element2.github
            }
            element.mentor_email = element2.mentor_email;
            element.mentees.push(student);

            console.log(element.menntor_);
            console.log(student); 
        }
    });

});
    
// console.log(mentor);

// const emails = JSON.stringify(mentor);
// fs.writeFileSync('./mailmentor.json', emails);

