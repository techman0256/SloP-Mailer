// This mailer app contais the code to send email for SloP program organized by Google Developer Student Club DA-IICT
// This app is written by Pranav Patel
// It will help while sending email to mentors about their mentees assigned to them while Slop program

// Make sure edge case: if no project is assigned to mentor then what to do ??


const nodemailer = require("nodemailer");
const  ejs = require("ejs")

const from = '202103040@daiict.ac.in' //Mail will be sent from this email address


const mentees = [
    {
        name: 'techman0256',
        project: 'Project A',
        email: 'patelpranav916@gmail.com',
        github: 'https://github.com/techman0256'
    },
    {
        name: 'Pranav Patel',
        project: 'Project B',
        email: '202103040@daiict.ac.in',
        github: 'https://github.com/pranav3040'
    },
    // Add more mentees as needed
];

const emailTemplate = `<!DOCTYPE html>
<html>
<head>
    <style>
    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }
    th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    th {
        background-color: #f2f2f2;
    }
    </style>
</head>
<body>
    <div>
        <h1>🚀 SloP 3.0 - Mentees Assigned to Your Project 🚀</h1>
        <p>Hello <%= mentorName %>,</p>

        <p>We are pleased to inform you that the following mentees have been assigned to your project for SloP 3.0:</p>

        <table>
            <tr>
                <th>Mentee Name</th>
                <th>Project Name</th>
                <th>Email</th>
                <th>GitHub Link</th>
            </tr>
            <% mentees.forEach(function(mentee) { %>
                <tr>
                    <td><%= mentee.name %></td>
                    <td><%= mentee.project %></td>
                    <td><%= mentee.email %></td>
                    <td><a href="<%= mentee.github %>" target="_blank">GitHub</a></td>
                </tr>
            <% }); %>
        </table>

        <p>Please make sure to reach out to these mentees and provide them with guidance and support for the successful completion of the project. If you have any questions or need further information, feel free to contact us.</p>

        <p>Thank you for your dedication to mentoring our students and leading this project for SloP 3.0. 👏</p>

        <p>Best regards,</p>
        <p>Your Organization </p>
    </div>
</body>
</html>
`
mentors = [{name: 'Shakuntla Patel', email : 'shakuntlapatel09@gmail.com'}, {name: 'Pranav Patel', email : 'patelpranav916@gmail.com'}]  



function sendEmail(mentor) {
    const renderEmailTemplate = ejs.render(emailTemplate, {mentorName: mentor.name, mentees: mentees});
    // console.log(renderEmailTemplate);
    
    return transporter.sendMail({
        from: from,
        to: mentor.email,
        subject: 'Subject: [SloP 3.0] Mentees Assigned to Your Project',
        html: renderEmailTemplate,
    });
}

function main() {
    const promises = mentors.map((mentor) => sendEmail(mentor));
    
    Promise.all(promises)
    .then((results) => {
        results.forEach((info) => {
            console.log('Message sent: %s', info.messageId);
            console.log('Message sent to : %s', mentors.email);
        });
    })
    .catch((error) => {
        console.error('Error sending emails:', error);
    });
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        // re[place with your own email and password [password may not work here (due to google disabled less secure app feature)]
        // then use two step verification process or create auth token
        user: '202103040@daiict.ac.in',
        pass: 'zixh ffwt owhv meku',
    },
});
main();