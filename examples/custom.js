var Mailgen = require('../');

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Mailgen',
        link: 'https://mailgen.js/'
        // Optional logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});

// Generate e-mail body using mailgen
var emailBody = mailGenerator.generate({
    body: {
        name: 'John Appleseed',
        intro: 'Your subscription has been renewed successfully.',
        action: {
            instructions: 'You can review your purchase and check your account balance in your dashboard:',
            button: {
                color: 'blue',
                text: 'Go to Dashboard',
                link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
            }
        },
        outro: 'We hope you enjoy what we have to offer.'
    }
});

// Optionally, preview the generated e-mail by writing it to a local file
require('fs').writeFileSync('preview.html', emailBody, 'utf8');

// `emailBody` now contains the HTML body.
// It's up to you to send the e-mail. 
// Check out nodemailer to accomplish this: 
// https://nodemailer.com/

// Send the e-mail with your favorite mailer
// transporter.sendMail({
//     from: 'no-reply@mailgen.js',
//     to: 'target@email.com',
//     subject: 'Mailgen',
//     body: emailBody
// }, function (err) {
//     if (err) return console.log(err);
//     console.log('Message sent successfully.');
// });