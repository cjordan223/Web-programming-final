const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "pbx02885v6z2sh4e",
  password: "c5knaz6ke510q4xm",
  database: "bvw0sq4i2stomd3t"
});

module.exports = pool;