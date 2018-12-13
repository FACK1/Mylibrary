const dbConnection = require('../database/db_connection.js');
const getUser = (email, cb) => {
    dbConnection.query(`select id, email, password from users where email = $1`, [email], (err, res) => {
        if (err) {
          console.log(err);
          return cb(err);
        }
        cb(null, res.rows);
      }
    );

  };

module.exports = getUser;
