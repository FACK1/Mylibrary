
const path = require('path');
const fs = require('fs');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const handlers = require('./handler');
require('env2')('./config.env');
let { SECRET} = process.env;


const homeHandler = (request, response) => {

  if (request.headers.cookie) {

      jwt.verify(cookie.parse(request.headers.cookie).logged_in, SECRET, function(error, resp) {
        if(resp)
          {
						const htmlPath = path.join(__dirname, '..','..', 'public', 'userPage.html');
				   handlers.htmlFileHandler(request, response, htmlPath);

          }
          else if(!resp){
            const htmlPath = path.join(__dirname, '..','..', 'public', 'index.html');
            handlers.htmlFileHandler(request, response, htmlPath);
          }

          else if (error) {
          error401handler(request, response);
          }
      });
  }else {
    const htmlPath = path.join(__dirname, '..','..', 'public', 'index.html');
    handlers.htmlFileHandler(request, response, htmlPath);
  }

};


const error401handler = (request, response) => {
  response.writeHead(401, { 'Content-Type': 'text/plain' });
   response.end('fail');
}

module.exports=homeHandler;
