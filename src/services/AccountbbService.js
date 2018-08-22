import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllAccountbb = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM accountbb where CIF = ?" , [ cif ], (err, result) => {
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
const createAccountbb = (accountbb) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO accountbb set ? ", accountbb,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(accountbb);
        });
    });
}

/**
 * Update Agama
 */
const updateAccountbb = (accountbb,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE account SET ACCKEL =?,BUKUBESAR =?,KATEGORI =?,GOLONGAN =?,RESIKO =? where ACCBB = ? AND CIF = ? ',[accountbb.ACCKEL,accountbb.BUKUBESAR,accountbb.KATEGORI,accountbb.GOLONGAN,accountbb.RESIKO,accountbb.ACCBB,CIF], function (err, results, fields) {
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
const deleteAccountbb = (accountbb) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM accountbb WHERE ACCBB = ? AND CIF = ?", [accountbb.ACCBB , accountbb.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllAccountbb    : findAllAccountbb,
    createAccountbb     : createAccountbb,
    updateAccountbb     : updateAccountbb,
    deleteAccountbb     : deleteAccountbb
}

