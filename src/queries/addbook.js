
const db_connection = require("../database/db_connection");

module.exports=(title,dis,img,link,rate,user_id, cb)=> {
  db_connection.query(
    'INSERT INTO books (title,dis,img,link,rate,user_id) values ($1, $2, $3, $4, $5,$6)',
    [title,dis,img,link,rate,user_id], (error)=>{
    if (error){
      console.log(error);
        cb(error);
    }else {
      cb(null);
    }
  });
};
