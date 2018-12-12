const handler = require('./handler');
const url = require('url');

const router =(request,response)=>{
var {pathname} = url.parse(request.url)
pathname ="/"+ pathname.split('/')[1];
// console.log(request.method);
// console.log(pathname);

switch (`${request.method} ${pathname}`) {
  case 'GET /':
    handler.homeHandler(request,response);
    break;
  case 'GET /public':
    handler.publicHandler(request,response);
      break;
  case 'GET /singup':
    handler.signUpHandler(request,response);
      break;
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
}
module.exports=router;
