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
}
module.exports=router;
