
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllInstansi = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM instansi where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

const generateKodeInstansi = (cif) => {
     return new Promise((resolve,reject) => {
        db.query("select max(ki) + 1 as KI  from instansi where cif = ?", [cif],  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(result[0]['KI']);
        });
    });
}
/**
 * Membuat agama baru
 */
const createInstansi = (instansi) => {
    console.log(instansi);
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO instansi set ? ", instansi,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(instansi);
        });
    });
}

/**
 * Update Agama
 */
const updateInstansi = (instansi,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE instansi SET NAMA_INSTANSI=?, ALAMAT=?,TELEPON=?,HANDPHONE=?,NAMA_BENDAHARA=? where KI = ? AND CIF = ? ',[instansi.NAMA_INSTANSI,instansi.ALAMAT,instansi.TELEPON,instansi.HANDPHONE,instansi.NAMA_BENDAHARA,instansi.KI,CIF], function (err, results, fields) {
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
const deleteInstansi = (instansi) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM instansi WHERE KI = ? AND CIF = ?", [instansi.KI , instansi.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllInstansi    : findAllInstansi,
    createInstansi     : createInstansi,
    updateInstansi     : updateInstansi,
    deleteInstansi     : deleteInstansi,
    generateKodeInstansi : generateKodeInstansi
}

