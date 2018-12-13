const handler = require('./handler');
const url = require('url');
const homeHandler=require('./homeHandler')
const login = require('./loginHandler');
const signup = require('./signupHandler');
const addbook = require('./addbookHandler');


const router =(request,response)=>{

var {pathname} = url.parse(request.url)
pathname ="/"+ pathname.split('/')[1];


switch (`${request.method} ${pathname}`) {
  case 'GET /':
    homeHandler(request,response);
    break;
  case 'GET /public':
    handler.publicHandler(request,response);
      break;
  case 'POST /signup':
    signup(request,response);
      break;
  case 'POST /login':
    login(request,response);
    break;
  case 'GET /logout':
    handler.logoutHandler(request,response);
    break;
  case 'POST /addbook':
    addbook(request,response);
    break;
  default:
      handler.notFoundHandler(request,response);
}
}
module.exports=router;
