const handler = require('./handler');
const url = require('url');

const router =(request,response)=>{
const {pathname} = url.parse(request.url)
pathname = pathname.split('/')[0];
switch (`${req.method} ${pathname}`) {
  case 'GET /':
    handler.homeHandler(request,response);
    break;
  case 'GET /public':
    handler.publicHandler(request,response);
  case 'POST /login':
    handler.loginHandler(request,response);
    break;
  case 'POST /logout':
    handler.logoutHandler(request,response);
    break;
  case 'GET /addbook':
    handler.addbookHandler(request,response);
    break;
  case 'GET /profile':
    handler.profileHandler(request,response);
    break;
  default:
      handler.notFoundHandler(request,response);
}
 	// if (pathname === '/' ) {
	// 	handler.homeHandler(request,response);
	// }
	// else if (pathname.includes('.')) {
  // 	handler.publicHandler(request,response);
	// }
	// else if (pathname.includes('/search/')) {
	// 	handler.searchHandler(request,response);
	// }
	// else
	// {
	// 	handler.notFoundHandler(request,response);
	// }
}
module.exports=router;
// const payload = {
//   userId: 2,
//   username:'sama'
// };
// const secret='123sama123';
// var token = jwt.sign(payload,secret);
// const notFoundPage = '<p style="font-size: 10vh; text-align: center;">404!</p>';
