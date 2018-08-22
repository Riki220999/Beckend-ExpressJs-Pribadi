import mysql from 'mysql';
import config from './../config.json';
const connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});
connection.connect(function(err){
    if(err) {
        console.log("database tidak tersambung");
    } 
});
module.exports = connection;