
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllPekerjaan = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_pekerjaan where CIF = ?" , [ cif ], (err, result) => {
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
const createPekerjaan = (pekerjaan) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_pekerjaan set ? ", pekerjaan,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(pekerjaan);
        });
    });
}

/**
 * Update Agama
 */
const updatePekerjaan = (pekerjaan,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_pekerjaan SET URUT=? where PEKERJAAN = ? AND CIF = ? ',[pekerjaan.URUT,pekerjaan.PEKERJAAN,CIF], function (err, results, fields) {
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
const deletePekerjaan = (pekerjaan) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_pekerjaan WHERE PEKERJAAN = ? AND CIF = ?", [pekerjaan.PEKERJAAN , pekerjaan.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllPekerjaan    : findAllPekerjaan,
    createPekerjaan     : createPekerjaan,
    updatePekerjaan     : updatePekerjaan,
    deletePekerjaan     : deletePekerjaan
}

