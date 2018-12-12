const dbConnection = require('../database/db_connection.js');

  const getData = (title,cb) => {
      const parameters = [title];
      var q=`SELECT title,dis,rate from books where title=$1;`;
      dbConnection.query(q,parameters, (err, res) => {
        if (err) return cb(err);
        cb(null, res.rows);
      });
}
module.exports = getData;
