const db_connection = require("../database/db_connection");

module.exports=(title,dis,rate,user_id, cb)=> {
  db_connection.query(
    'INSERT INTO books (title,dis,rate,user_id) values ($1, $2, $3)',
    [title,dis,rate,user_id], (error)=>{
    if (error){
        cb(error);
    }else {
      cb(null);
    }
  });
};
