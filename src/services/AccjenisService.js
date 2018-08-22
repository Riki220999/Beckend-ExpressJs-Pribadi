
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllAccjenis = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_accjenis where CIF = ?" , [ cif ], (err, result) => {
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
const createAccjenis = (accjenis) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_accjenis set ? ", accjenis,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(accjenis);
        });
    });
}

/**
 * Update Agama
 */
const updateAccjenis = (accjenis,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_accjenis  SET JENIS =? where ACCJENIS = ? AND CIF = ? ',[accjenis.JENIS,accjenis.ACCJENIS,CIF], function (err, results, fields) {
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
const deleteAccjenis = (accjenis) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_accjenis WHERE ACCJENIS = ? AND CIF = ?", [accjenis.ACCJENIS , accjenis.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllAccjenis    : findAllAccjenis,
    createAccjenis     : createAccjenis,
    updateAccjenis     : updateAccjenis,
    deleteAccjenis     : deleteAccjenis
}

