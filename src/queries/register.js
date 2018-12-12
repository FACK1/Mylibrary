const db_connection = require("../database/db_connection");

module.exports=(name, email, password, cb)=> {
  db_connection.query(
    'INSERT INTO users (name, email,password) values ($1, $2, $3)',
    [name,email, password], (error)=>{
    if (error){
      console.log(error);
        cb(error);
    }else {
      cb(null);
    }
  });
};
