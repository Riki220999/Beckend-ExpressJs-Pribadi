
import db from './../lib/db';

const findAllUser = () => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM users " , (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

const createUser = (users) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO users set ? ", users,  function (err, result, fields) {
                    if (err){
                reject(err);
            }
            resolve(users);
        });
    });
}

const updateUser = (users,Id) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE users SET Id=? where name = ? AND email = ? ',[users.name,users.email,Id], function (err, results, fields) {
            if(err)
            {
                reject(err);
            }
            else{
                resolve(results);
            }
        });
    });
}

const deleteUser = (users) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM users WHERE Id = ? ", [ users.Id],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllUser    : findAllUser,
    createUser     : createUser,
    updateUser     : updateUser,
    deleteUser     : deleteUser
}

