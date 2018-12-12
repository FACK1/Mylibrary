const path = require('path');
const querystring = require('querystring');
const requester = require('request');
const { readFile } = require('fs');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const getData=require('./queries/get.js');
const setData=require('./queries/set.js');
const check=require('./queries/check.js');
const alert = require('alert-node');

const secret='123book123';
var token = jwt.sign(payload,secret);

//-----------------------------------------------------------------------------

const homeHandler = (request, response) => {
  const send401 = () => {
        const message = 'fail!';
        res.writeHead(
          401,
          {
            'Content-Type': 'text/plain',
            'Content-Length': message.length
          }
        );
        return res.end(message);
      }
  const { jwt } = parse(req.headers.cookie);

      if (!jwt) return send401();

      return verify(jwt, SECRET, (err, jwt) => {
        if (err) {
          return send401();
        } else {
          const message = `Your user id is: ${jwt.userId}`;
          res.writeHead(
            200,
            {
              'Content-Type': 'text/plain',
              'Content-Length': message.length
            }
          );
          return res.end(message);
        }
      });

  ///////
  if (req.headers.cookie) {
      profileHandler(re)
  }
  else {
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(htmlPath, (error, file) => {
      if (error) {
        notFoundHandler(request, response);
        return;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    });
  }

};

//-----------------------------------------------------------------------------

const publicHandler = (request, response) => {
  const extention = request.url.split('.')[1];
  const ContentTypeMapping = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/js',
    jpg: 'image/jpg',
    png: 'image/png',
    ico: 'image/x-ico',
    jpeg:'image/jpeg',
  };

  if (ContentTypeMapping[extention] === undefined) {
    notFoundHandler(request, response);
    return;
  }

  const filePath = path.join(__dirname, '..', 'public', request.url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>Sorry, There is an error!</h1>');
      return;
    }
    response.writeHead(200, { 'Content-Type': ContentTypeMapping[extention] });
    response.end(file);
  });
};

//-----------------------------------------------------------------------------

const loginHandler = (request,response) => {

  var { query }=url.parse(request.url);
  var {email}=queryString.parse(query);
  var {password}=queryString.parse(query);
  getData(email,password,(err, res) => {
    if (err){
      response.writeHead(500, { 'Content-Type': 'plain/text' });
      response.end("Server Error");
    }
    else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(res));
    }
});


  response.writeHead(302, { 'Location': '/','Set-Cookie': [`logged_in=${token}; HttpOnly; Max-Age=9000`] });
  response.end();
}
//-----------------------------------------------------------------------------

const profileHandler = (request,response) => {

    }


//-----------------------------------------------------------------------------

const logoutHandler = (request,response) => {
  response.writeHead(302,{'Location': '/','Set-Cookie': `logged_in=${0}; Max-Age=0`});
  response.end();
    }
//-----------------------------------------------------------------------------

const addbookHandler = (request,response) => {

    }

//-----------------------------------------------------------------------------

// const searchHandler = (request, response) => {
//   var value = request.url.split('/')[2];
//   if (value === undefined) {
//     response.writeHead(404, { 'Content-Type': 'text/plain' }); // we need to handle the error input
//     response.end('error');
//   } else {
//
//   const product_url =
//   `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${value}`
//
//   requester.get(product_url, (err, res, body) => {
//       var data  = JSON.parse(body)
//       var filteredData = data.splice(0,5);
//       var result = filteredData.map(obj =>{
//       return  {
//           "brand": obj.brand,
//           "name": obj.name,
//           "image": obj.image_link,
//           "price": obj.price,
//           "currency": obj.price_sign
//         }
//   })
//
// var convertedData = JSON.stringify(result);
// response.writeHead(200, {"Content-Type": "application/json"});
// response.end(convertedData);
//
//       })
// }
//     }

//-----------------------------------------------------------------------------

const notFoundHandler = (request, response) => {
  response.writeHead(404)
  return response.end('Page not found!')
}
module.exports = { homeHandler, publicHandler, loginHandler, logoutHandler, addbookHandler, notFoundHandler};
