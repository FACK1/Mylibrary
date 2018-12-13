const alert = require('alert-node');
const jwt = require('jsonwebtoken');
const cookie=require('cookie');
const queryString = require('querystring');
require('env2')('./config.env');
const handlers = require('./handler');
const { SECRET } = process.env;

const addbook = require('../queries/addbook');

const addbookHandler = (request, response) => {

let data = '';
					 request.on('data', chunk => {
							 data += chunk;
					 });

					 request.on('end', (err) => {
							 const {bookName,bookImg,bookLink,link,rate} = queryString.parse(data);
							 const token = cookie.parse(request.headers.cookie).logged_in;

							 jwt.verify(token, SECRET, function(err, decoded) {
							 var user_id= decoded.id;

							 if (err) {
							 	serverErrorHandler(request, response);
								return
							 }
							 addbook(bookName,bookImg,bookLink,link,1,user_id, (err) => {
									 	 if (err) {
									 			handlers.serverErrorHandler(request, response);
									 	 } else {
											 alert("done!")
									 			handlers.redirectHandler(request, response);
									 	 }


						 			});
														 });
	 });


}

module.exports = addbookHandler;
