
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllGolongan = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_golongan where CIF = ?" , [ cif ], (err, result) => {
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
const createGolongan = (golongan) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_golongan set ? ", golongan,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(golongan);
        });
    });
}

/**
 * Update Agama
 */
const updateGolongan = (golongan,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_golongan SET NO=?,PANGKAT =?,POKOK =?,WAJIB =? where GOLONGAN = ? AND CIF = ? ',[golongan.NO,golongan.PANGKAT,golongan.POKOK,golongan.WAJIB,golongan.GOLONGAN,CIF], function (err, results, fields) {
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
const deleteGolongan = (golongan) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_golongan WHERE GOLONGAN = ? AND CIF = ?", [golongan.GOLONGAN , golongan.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllGolongan    : findAllGolongan,
    createGolongan     : createGolongan,
    updateGolongan     : updateGolongan,
    deleteGolongan     : deleteGolongan
}

