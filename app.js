var express = require('express');
var fs = require('fs');
// var bodyParser = require('body-parser');
// var nodemailer = require('nodemailer');
var app = express();

app.use(express.static('/public'));

app.get('/', function (req, res) {
  res.send(fs.readFileSync('index.html', 'utf8'));
});

const request = require('request');

request.post(
  process.env.TRUSTIFI_URL + '/api/i/v1/email',
  {
    headers: {
      'x-trustifi-key': process.env.TRUSTIFI_KEY,
      'x-trustifi-secret': process.env.TRUSTIFI_SECRET,
    },
    json: {
      recipients: [{ email: 'test@trustificorp.org' }],
      title: 'Title',
      html: 'Body',
    },
  },
  (err, res, body) => {
    console.log(body);
  }
);

// app.post('/', function (req, res) {
//   var name = req.body['name'];
//   var email = req.body['email'];
//   var subject = req.body['subject'];
//   var message = req.body['message'];

//   if (!name || !email || !subject || !message) {
//     res.send('Error: Name, email, subject or message should not be blank');
//     return false;
//   }

//   var smtpTransport = nodemailer.createTransport('SMTP', {
//     host: 'smtp.gmail.com',
//     secureConnection: true,
//     port: 2525,
//     auth: {
//       user: '',
//       pass: '',
//     },
//   });

//   var mailOptions = {
//     from: email,
//     to: 'Node Emailer - <rodrigo.araujo.9731@gmail.com>',
//     subject: subject + ' -',
//     html: '<b>' + message + '<b>',
//   };
//   smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       res.send('Email could not be sent due to error:' + error);
//     } else {
//       res.send('Email has been sent successfully');
//     }
//   });
// });

app.listen(process.env.PORT || 3000, function () {
  console.log('LISTENING!');
});
