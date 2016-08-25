const express = require('express');
const app = express();
const morgan = require('morgan');


let guests = [
 { preferredName: 'Sergey', lastName: 'Brin', company: 'Google', vip: true },
 { preferredName: 'Larry', lastName: 'Page', company: 'Google', vip: true },
];

let kicked = [];

app.listen(3000);

app.use(morgan('dev'))


// custom logging replaced by morgan
// app.use( (req, res, next) => {
//   var start = new Date();
//   next();
//   var end = new Date();
//   console.log(req.method, req.url, end - start, 'ms');
// });

app.use(require('body-parser').json());

// // sets all body info to req.body for use inside posts, it's simply req.body
// app.use( (req, res, next) => {
//   let body = '';
//
//   req.on('data', (chunk) => { body += chunk.toString() });
//
//   req.on('end', () => {
//     if (body !== '') {
//       req.body = JSON.parse(body);
//     }
//
//     next();
//   });
// });
//
app.get('/guests', (req, res, next) => {
  res.send((guests));
})

app.post('/invite', (req, res, next) => {
  let data = req.body
  guests.push(data);
  res.status(201).send(guests)
})


app.delete('/kick/:company', (req, res, next) => {
  kicked = guests.filter( (guest) => {
    return guest.company.toLowerCase() === req.params.company.toLowerCase();
  })
  guests = guests.filter( (guest) => {
    return guest.company.toLowerCase() !== req.params.company.toLowerCase();
  })
  res.send(guests);
})
