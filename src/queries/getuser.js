const dbConnection = require('../database/db_connection.js');

  const getData = (email,password,cb) => {
      const parameters = [email,password];
      var q=`SELECT name from users where email=$1 and password=$2;`;
      dbConnection.query(q,parameters, (err, res) => {
        if (err) return cb(err);
        cb(null, res.rows);
      });
}
module.exports = getData;
