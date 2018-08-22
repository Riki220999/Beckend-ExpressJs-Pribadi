import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllAccount = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM account where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

/**
 * Membuat agama baru
 */
const createAccount = (account) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO account set ? ", account,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(account);
        });
    });
}

/**
 * Update Agama
 */
const updateAccount = (account,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE account SET ACC =?,KETERANGAN =?,GOLONGAN =?,KU =? where ACCBB = ? AND CIF = ? ',[account.ACC,account.KETERANGAN,account.GOLONGAN,account.KU,account.ACCBB,CIF], function (err, results, fields) {
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

/**
 * delete agama
 */
const deleteAccount = (account) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM account WHERE ACCBB = ? AND CIF = ?", [account.ACCBB , account.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllAccount    : findAllAccount,
    createAccount     : createAccount,
    updateAccount     : updateAccount,
    deleteAccount     : deleteAccount
}

