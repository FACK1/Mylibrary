const path = require('path');
const queryString = require('querystring');
const fs = require('fs');
const url = require('url')
const register = require('../queries/register');
const checkuser = require('../queries/checkuser');
const getUser = require('../queries/get');
const bcrypt = require("bcryptjs");
const alert = require('alert-node');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');
const { SECRET } = process.env;



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
		jpeg: 'image/jpeg',
	};

	if (ContentTypeMapping[extention] === undefined) {
		notFoundHandler(request, response);
		return;
	}

	const filePath = path.join(__dirname, '..', '..', request.url);
	fs.readFile(filePath, (error, file) => {
		if (error) {
			response.writeHead(500, {
				'Content-Type': 'text/html'
			});
			response.end('<h1>Sorry, There is an error!</h1>');
			return;
		}
		response.writeHead(200, {
			'Content-Type': ContentTypeMapping[extention]
		});
		response.end(file);
	});
};

//-----------------------------------------------------------------------------

const logoutHandler = (request, response) => {
	response.writeHead(302, {	'Location': '/', 'Set-Cookie': 'Max-Age=0' });
	response.end();
}

//-----------------------------------------------------------------------------

const addbookHandler = (request, response) => {

}

//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------

const notFoundHandler = (request, response) => {
	response.writeHead(404)
	return response.end('Page not found!')
}

//-----------------------------------------------------------------------------

const serverErrorHandler = (request, response) => {
  response.statusCode = 500;
	response.end('Server Error, Sorry!')
};

//-----------------------------------------------------------------------------

const forbiddenHandler = (request, response) => {
	response.statusCode = 403;
	response.end('Attachment Unavailable, No Permission')
}

const redirectHandler = (request, response) => {
	response.writeHead(302, {	'Location': '/'	});
	response.end();
}

const htmlFileHandler = (request, response, filePath) => {

fs.readFile(filePath, (error, file) => {
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

const setTokenHandler = (request, response, filePath, {id, email}) => {

fs.readFile(filePath, (error, file) => {
	if (error) {
		notFoundHandler(request, response);
		return;
	}
const token = jwt.sign({id, email}, SECRET);

              response.writeHead(200, {
                'Set-Cookie':`logged_in=${token} id=${id}; Max-Age=9000;`,
                'Content-Type': 'text/html'
            });
              response.end(file);
})
}


module.exports = {
	publicHandler,
	logoutHandler,
	addbookHandler,
	notFoundHandler,
	htmlFileHandler,
	setTokenHandler,
	forbiddenHandler,
redirectHandler,
serverErrorHandler

};
