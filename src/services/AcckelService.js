import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllAcckel = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_acckel where CIF = ?" , [ cif ], (err, result) => {
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
const createAcckel = (acckel) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_acckel set ? ", acckel,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(acckel);
        });
    });
}

/**
 * Update Agama
 */
const updateAcckel = (acckel,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_acckel SET ACCJENIS =?,KELOMPOK =?,GOL =?,SUBGOL =? where ACCKEL = ? AND CIF = ? ',[acckel.ACCJENIS,acckel.KELOMPOK,acckel.GOL,acckel.SUBGOL,acckel.ACCKEL,CIF], function (err, results, fields) {
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
const deleteAcckel = (acckel) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_acckel WHERE ACCKEL = ? AND CIF = ?", [acckel.ACCKEL , acckel.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllAcckel    : findAllAcckel,
    createAcckel     : createAcckel,
    updateAcckel     : updateAcckel,
    deleteAcckel     : deleteAcckel
}

