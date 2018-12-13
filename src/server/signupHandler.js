const queryString = require('querystring');
const register = require('../queries/register');
const checkuser = require('../queries/checkuser');
const bcrypt = require("bcryptjs");
const alert = require('alert-node');
const handlers = require('./handler');





const signUpHandler = (request, response) => {

	let data = '';
		request.on('data', chunk => {
			data += chunk;
		});

		request.on('end', (err) => {
			const { email, password,	name	} = queryString.parse(data);


	checkuser(email, (err, res) => {
		if (err) {
			handlers.serverErrorHandler(request, response);
		} else {

			if (res.length <= 0) {

				bcrypt.genSalt(10, function (err, salt) {
					bcrypt.hash(password, salt, function (err, hash) {
						if (err) {
							handlers.serverErrorHandler(request, response);
							return
						} else {
							register(name, email, hash, (err) => {
								if (err) {
										handlers.serverErrorHandler(request, response);
								} else {
                  alert("you are registered");
								handlers.redirectHandler(request, response);
								}
							});


						}
					});
				});


			} else {
alert("Email exists");
				response.writeHead(302, {
					'Location': '/'
				});
				response.end();
			}

		}

	})

})
}


module.exports = signUpHandler;
