const path = require('path');
const queryString = require('querystring');
const fs = require('fs');
const url = require('url')
const register = require('../queries/register');
const checkuser = require('../queries/checkuser');
const bcrypt = require("bcryptjs");

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
const signUpHandler = (request, response) => {

	let data = '';
		request.on('data', chunk => {
			data += chunk;
		});

		request.on('end', (err) => {
			const { email, password,	name	} = queryString.parse(data);


	checkuser(email, (err, res) => {
		if (err) {
			response.writeHead(500, {
				'Content-Type': 'plain/text'
			});
			response.end("Server Error");
		} else {

			if (res.length <= 0) {

				bcrypt.genSalt(10, function (err, salt) {
					bcrypt.hash(password, salt, function (err, hash) {
						if (err) {
							response.statusCode = 500;
							response.end('Error registered in')
							return
						} else {
							console.log(hash);
							register(name, email, hash, (err) => {
								if (err) {
									response.writeHead(500, {
										'Content-Type': 'plain/text'
									});
									response.end("Server Error");
								} else {
									response.writeHead(302, {
										'Location': '/'
									});
									response.end();
								}
							});


						}
					});
				});


			} else {

				response.writeHead(200, {
					'Content-Type': 'application/json'
				});
				response.end("email exist");
			}

		}

	})

})
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
