const {Pool} =require('pg');
const url =require('url');

require('env2')('./config.env');
let { DATABASE_URL } = process.env;

if(!DATABASE_URL){
  throw Error('No Data Base URL');
}

const option = {
  connectionString : DATABASE_URL
};
const hostname = url.parse(DATABASE_URL).hostname;
option.ssl =(hostname !== 'localhost');
module.exports = new Pool(option);
