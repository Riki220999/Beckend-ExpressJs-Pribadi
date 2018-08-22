
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllPendidikan = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_pendidikan where CIF = ?" , [ cif ], (err, result) => {
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
const createPendidikan = (pendidikan) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_pendidikan set ? ", pendidikan,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(pendidikan);
        });
    });
}

/**
 * Update Agama
 */
const updatePendidikan = (pendidikan,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_pendidikan SET URUT=? where PENDIDIKAN = ? AND CIF = ? ',[pendidikan.URUT,pendidikan.PENDIDIKAN,CIF], function (err, results, fields) {
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
const deletePendidikan = (pendidikan) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_pendidikan WHERE PENDIDIKAN = ? AND CIF = ?", [pendidikan.PENDIDIKAN , pendidikan.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllPendidikan    : findAllPendidikan,
    createPendidikan     : createPendidikan,
    updatePendidikan     : updatePendidikan,
    deletePendidikan     : deletePendidikan
}

