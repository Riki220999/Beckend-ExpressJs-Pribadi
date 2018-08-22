
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllJabatan = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_jabatan where CIF = ?" , [ cif ], (err, result) => {
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
const createJabatan = (jabatan) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_jabatan set ? ", jabatan,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(jabatan);
        });
    });
}

/**
 * Update Agama
 */
const updateJabatan = (jabatan,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_jabatan SET URUT=? where JABATAN = ? AND CIF = ? ',[jabatan.URUT,jabatan.JABATAN,CIF], function (err, results, fields) {
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
const deleteJabatan = (jabatan) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_jabatan WHERE JABATAN = ? AND CIF = ?", [jabatan.JABATAN , jabatan.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllJabatan    : findAllJabatan,
    createJabatan     : createJabatan,
    updateJabatan     : updateJabatan,
    deleteJabatan     : deleteJabatan
}

