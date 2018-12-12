const path = require('path');
const queryString = require('querystring');
const fs = require('fs');
const cookie = require('cookie');

//-----------------------------------------------------------------------------



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

	const filePath = path.join(__dirname, '..','..', request.url);
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
const  signUpHandler=(request, response) => {
  const {query} = url.parse(request.url);
  const {email} = queryString.parse(query);
  const {password} = queryString.parse(query);
  const {fullName} = queryString.parse(query);


}

const loginHandler = (request, response) => {

}
//-----------------------------------------------------------------------------

const profileHandler = (request, response) => {

}
//-----------------------------------------------------------------------------

const logoutHandler = (request, response) => {
	response.writeHead(302, {
		'Location': '/',
		'Set-Cookie': `logged_in=${0}; Max-Age=0`
	});
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
module.exports = {
	publicHandler,
	loginHandler,
	logoutHandler,
	addbookHandler,
	notFoundHandler,
  signUpHandler
};
