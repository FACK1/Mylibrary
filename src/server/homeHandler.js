
const path = require('path');
const fs = require('fs');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');
let { SECRET} = process.env;


const homeHandler = (request, response) => {

  if (request.headers.cookie) {
      //console.log(cookie.parse(request.headers.cookie).logged_in);

      jwt.verify(cookie.parse(request.headers.cookie).logged_in, SECRET, function(error, resp) {
        if(resp)
          {
						const htmlPath = path.join(__dirname, '..','..', 'public', 'userPage.html');
				    fs.readFile(htmlPath, (error, file) => {
				      if (error) {
				        notFoundHandler(request, response);
				        return;
				      }
				      response.writeHead(200, {
				        'Content-Type': 'text/html'
				      });
				      response.end(file);
				    })
          }else if(!resp){
            const htmlPath = path.join(__dirname, '..','..', 'public', 'index.html');
          //  console.log(htmlPath);
            fs.readFile(htmlPath, (error, file) => {
              if (error) {
                notFoundHandler(request, response);
                return;
              }
              response.writeHead(200, {
                'Content-Type': 'text/html'
              });
              response.end(file);
            });
          }

          else if (error) {
            const message = 'fail!';
            response.writeHead(
              401,
              {
                'Content-Type': 'text/plain'
              }
            );
             response.end(message);
          }
      });
  }else {
    const htmlPath = path.join(__dirname, '..','..', 'public', 'index.html');
    fs.readFile(htmlPath, (error, file) => {
      if (error) {
        notFoundHandler(request, response);
        return;
      }
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.end(file);
    })
  }

};
const notFoundHandler = (request, response) => {
	response.writeHead(404)
	return response.end('Page not found!')
}
module.exports=homeHandler;
