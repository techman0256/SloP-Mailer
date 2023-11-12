// This mailer app contais the code to send email for SloP program organized by Google Developer Student Club DA-IICT
// This app is written by Pranav Patel
// It will help while sending email to mentors about their mentees assigned to them while Slop program

// Make sure edge case: if no project is assigned to mentor then what to do ??


const nodemailer = require("nodemailer");
const ejs = require("ejs")
// const mentor = require('./mentor.json');
// const mentee = require('./mentees.json')

require('dotenv').config();

// Test mentee object for demo mail

const mentee = [
    {
        "name": "Yuvjeet Arora",
        "email": "vrutikprajapati2809@gmail.com",
        "project": "https://github.com/Jam-Burger/Chess_AI",
        mentor: "Jay Malaviya",
        mentor_email: "202101048@daiict.ac.in"
    },
    {
        "name": "Yuvjeet Arora",
        "email": "vrutikprajapati2809@gmail.com",
        "project": "https://github.com/Jam-Burger/Chess_AI",
        "mentor": "Jay Malaviya",
        "mentor_email": "202101048@daiict.ac.in"
    }

]

// Test mentor mail (demo mail for sending to mentor)

const mentor = [
    {
        "mentor_name": "Jay Malaviya",
        "mentor_email": "vrutikprajapati2809@gmail.com",
        "mentees": [
            {
                "project": "https://github.com/Jam-Burger/Chess_AI",
                "name": "Yuvjeet Arora",
                "email": "artiarorasingh@gmail.com",
                "github": "https://github.com/Yuvjeet"
            },
            {
                "project": "https://github.com/Jam-Burger/Chess_AI",
                "name": "Krish Gaur",
                "email": "krishgaur13@gmail.com",
                "github": "https://github.com/KrishGaur1354"
            },
            {
                "project": "https://github.com/Jam-Burger/Kitter",
                "name": "Parjanya Rajput",
                "email": "202201115@daiict.ac.in",
                "github": "https://github.com/parjanya-rajput"
            },
            {
                "project": "https://github.com/Jam-Burger/Kitter",
                "name": "Pratik Ringe",
                "email": "pratikringe0406@gmail.com",
                "github": "https://github.com/pratikringe46"
            }
        ]
    },
    {
        "mentor_name": "Jay Malaviya",
        "mentor_email": "vrutikprajapati2809@gmail.com",
        "mentees": [
            {
                "project": "https://github.com/Jam-Burger/Chess_AI",
                "name": "Yuvjeet Arora",
                "email": "artiarorasingh@gmail.com",
                "github": "https://github.com/Yuvjeet"
            },
            {
                "project": "https://github.com/Jam-Burger/Chess_AI",
                "name": "Krish Gaur",
                "email": "krishgaur13@gmail.com",
                "github": "https://github.com/KrishGaur1354"
            },
            {
                "project": "https://github.com/Jam-Burger/Kitter",
                "name": "Parjanya Rajput",
                "email": "202201115@daiict.ac.in",
                "github": "https://github.com/parjanya-rajput"
            },
            {
                "project": "https://github.com/Jam-Burger/Kitter",
                "name": "Pratik Ringe",
                "email": "pratikringe0406@gmail.com",
                "github": "https://github.com/pratikringe46"
            }
        ]
    }
];

const mentorTemplate = `<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            border: 2px solid #007bff;
            margin: 20px 0;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 2px solid #ddd;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        th, td {
            padding: 10px;
        }
    </style>
</head>
<body>
    <div>
        <h1>🚀 SloP 3.0 - Mentees Assigned to Your Project 🚀</h1>
        <p>Hello <%= mentorName %>,</p>

        <b> Please find the updated list of mentees for your project. </b>
        <p>We are pleased to inform you that the following mentees have been assigned to your project for SloP 3.0:</p>

        <table>
            <tr>
                <th>Mentee Name</th>
                <th>Project</th>
                <th>Email</th>
                <th>GitHub Link</th>
            </tr>
            <% mentees.forEach(function(mentee, index) { %>
                <tr <% if (index % 2 === 0) { %>style="background-color: #f2f2f2;"<% } %>>
                    <td><%= mentee.name %></td>
                    <td><%= mentee.project %></td>
                    <td><%= mentee.email %></td>
                    <td><a href="<%= mentee.github %>" target="_blank">GitHub</a></td>
                </tr>
            <% }); %>
        </table>

        <p>Please make sure to reach out to these mentees and provide them with guidance and support for the successful completion of the project. If you have any questions or need further information, feel free to contact us.</p>

        <p>Thank you for your dedication to mentoring our students and leading this project for SloP 3.0. 👏</p>
        
        <p>Please refer to this <span style="font-weight: bold; color: #007bff;"> <a href="https://docs.google.com/document/d/1kFkm3GFy_IX7bGFfcxFj8oQVGFAgZeglCLqcn_sdkZo/edit?usp=sharing" target="_blank">Setting up Webhooks to your repository</a> </span> for instructions on setting up Git webhooks in your project
         and <b> finish required steps within 24 hours.</b>
        </p>
        
        <b> Note: You need to create an Element-Matrix channel for each project and ask your mentees to join it for better communication. You need to add this channel link in the form attached to the webhook setup document. </b>
        <p>Best regards,</p>
        <p>Team SloP.</p>

    </div>
</body>
</html>
`
const menteeTemplate = `<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            border: 2px solid #007bff;
            margin: 20px 0;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 2px solid #ddd;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        th, td {
            padding: 10px;
        }
    </style>
</head>
<body>
    <div>
        <h1>🚀 SloP 3.0 - Mentor Assigned to Your Project 🚀</h1>
        <p>Hello <%= menteeName %>,</p>

        <b> Please refer to the updated mentor details below. </b>
        <p>We are pleased to inform you are going to work with <%= assigned_project %> for SloP 3.0:</p>

        <p>Please make sure to reach out your mentor <%= mentorName %> at <%= mentorEmail %>.</p>
        
        <p>Thank you for your dedication to your project, and we wish you a productive collaboration with your mentor. 👏</p>

        <p> You are required to join SloP-3 
        <a href="https://matrix.to/#/#slop-3:matrix.org" target="_blank">  space </a>, in that you have to join general and announcement channel.
        
        </p>
        
        <p>Best regards,</p>
        <p>Team SloP.</p>

    </div>
</body>
</html>
`

// mentors = [{name: 'Pranav Patel', email : 'patelpranav916@gmail.com'},{name: 'Vrutik Prajapati', email : 'vrutikprajapati2809@gmail.com'}]  
// //    

function sendEmailMentor(mentor) {
    const renderEmailTemplate = ejs.render(mentorTemplate, {mentorName: mentor.mentor_name, mentees: mentor.mentees});
    // console.log(renderEmailTemplate);   

    return transporter.sendMail({
        from: process.env.USER,
        to: mentor.mentor_email,
        subject: 'Subject: [SloP 3.0] Mentees Assigned to Your Project',
        html: renderEmailTemplate,
    });
}


function sendEmailStudent(mentee) {
    const renderEmailTemplate = ejs.render(menteeTemplate, {menteeName: mentee.name, mentorName: mentee.mentor, mentorEmail: mentee.mentor_email, assigned_project: mentee.project});
    // console.log(renderEmailTemplate);

    return transporter.sendMail({
        from: process.env.USER,
        to: mentee.email,
        subject: 'Subject: [SloP 3.0] Mentors Assigned to You',
        html: renderEmailTemplate,
    });
}

async function main() {
    // ***** Old grabage ****** //
    
    // const promises = mentee.map(async (student) => {
    //     sendEmailStudent(student)
    //     await new Promise(resolve => setTimeout(resolve, 3000));
    //     console.log('Maile sent to', student.email);
    // });
    
    // Promise.all(promises)
    // .then((results) => {
    //     results.forEach((info) => {
    //         console.log('Message sent: %s', info.envelope.to);
    //     });
    // })
    // .catch((error) => {
    //     console.error('Error sending emails:', error);
    // });

    // ***** Old grabage ****** //

    // updated code

    // Send mail to mentors
    // for (let m of mentor) {
    //     await sendEmailMentor(m)
    //     await new Promise(resolve => setTimeout(resolve, 3000));
    //     console.log('Mail sent to', m.mentor_email);
    // }
    
    // Send mail to mentees that you're assigned this project
    for (let m of mentee) {
        await sendEmailStudent(m)
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Mail sent to', m.email);
    }
    
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        // re[place with your own email and password [password may not work here (due to google disabled less secure app feature)]
        // then use two step verification process or create auth token
        user: process.env.USER,
        pass: process.env.PASS,
    },
});


main();
// console.log(student.length);