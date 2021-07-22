var express = require('express');
var fs = require('fs');
var https = require('follow-redirects').https;
var fs = require('fs');
// var nodemailer = require('nodemailer');
var app = express();

app.use(express.static('/public'));

app.get('/', function (req, res) {
  res.send(fs.readFileSync('index.html', 'utf8'));
});

const name = req.body['name'];
const email = req.body['email'];
const subject = req.body['subject'];
const message = req.body['message'];

var options = {
  method: 'POST',
  hostname: 'be.trustifi.com',
  path: '/api/i/v1/email/preview',
  headers: {
    'x-trustifi-key': process.env.TRUSTIFI_KEY,
    'x-trustifi-secret': process.env.TRUSTIFI_SECRET,
    'Content-Type': 'application/json',
  },
  maxRedirects: 20,
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on('error', function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
    recipients: [
      {
        email: 'rodrigo.araujo.9731@gmail.com',
        name: 'Rodrigo Araujo',
      },
    ],
    title: 'subject',
    html: 'message',
    methods: {
      postmark: false,
      secureSend: false,
      encryptContent: false,
      secureReply: false,
    },
  }(subject, message)),
  ;

req.write(postData);

req.end();

// const request = require('request');

// request.post(
//   process.env.TRUSTIFI_URL + '/api/i/v1/email',
//   {
//     headers: {
//       'x-trustifi-key': process.env.TRUSTIFI_KEY,
//       'x-trustifi-secret': process.env.TRUSTIFI_SECRET,
//     },
//     json: {
//       recipients: [{ email: 'test@trustificorp.org' }],
//       title: 'Title',
//       html: 'Body',
//     },
//   },
//   (err, res, body) => {
//     console.log(body);
//   }
// );

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
