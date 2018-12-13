const path = require('path');
const queryString = require('querystring');
const getUser = require('../queries/get');
const bcrypt = require("bcryptjs");
const alert = require('alert-node');
const handlers = require('./handler');


const loginHandler = (request, response) => {

	let data = '';
	request.on('data', chunk => {
		data += chunk;
	});

	request.on('end', (err) => {
		const { email, password	} = queryString.parse(data);

		getUser(email, (err, result) => {
			if (err) {
				handlers.serverErrorHandler(request,response);
				return
			}

				if (result <= 0) {
					alert('email does not exsit/password is wrong');
					handlers.redirectHandler(request, response);
					return
				}

bcrypt.compare(password, result[0].password, (err, flag) => {
        if (err) {
          handlers.serverErrorHandler(request, response);
          return
        }

        if (!flag) {
					alert('email does not exsit/password is wrong');
					handlers.redirectHandler(request, response);
					return
        }

        const id = result[0].id;
        const emaildb = result[0].email;
				const htmlPath = path.join(__dirname, '..','..', 'public', 'userPage.html');
				handlers.setTokenHandler(request, response, htmlPath, {id, emaildb});


      });
    })

		})
}

module.exports = loginHandler
