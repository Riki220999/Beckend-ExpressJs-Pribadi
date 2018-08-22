
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllKeluarga = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_hubkeluarga where CIF = ?" , [ cif ], (err, result) => {
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
const createKeluarga = (keluarga) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_hubkeluarga set ? ", keluarga,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(keluarga);
        });
    });
}

/**
 * Update Agama
 */
const updateKeluarga = (keluarga,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_hubkeluarga SET URUT=? where HUBKELUARGA = ? AND CIF = ? ',[keluarga.URUT,keluarga.HUBKELUARGA,CIF], function (err, results, fields) {
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
const deleteKeluarga = (keluarga) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_hubkeluarga WHERE HUBKELUARGA = ? AND CIF = ?", [keluarga.HUBKELUARGA , keluarga.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllKeluarga    : findAllKeluarga,
    createKeluarga     : createKeluarga,
    updateKeluarga     : updateKeluarga,
    deleteKeluarga     : deleteKeluarga
}

