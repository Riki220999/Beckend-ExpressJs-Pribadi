
import db from './../lib/db';

/**
 * Mengambil semua identitas
 */
const findAllIdentitas = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_identitas where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

/**
 * Membuat identitas baru
 */
const createIdentitas = (identitas) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_identitas set ? ", identitas,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(identitas);
        });
    });
}

/**
 * Update identitas
 */
const updateIdentitas = (identitas,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_identitas SET URUT=? where IDENTITAS = ? AND CIF = ? ',[identitas.URUT,identitas.IDENTITAS,CIF], function (err, results, fields) {
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
 * delete identitas
 */
const deleteIdentitas = (identitas) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_identitas WHERE IDENTITAS = ? AND CIF = ?", [identitas.IDENTITAS , identitas.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllIdentitas    : findAllIdentitas,
    createIdentitas     : createIdentitas,
    updateIdentitas     : updateIdentitas,
    deleteIdentitas     : deleteIdentitas
}

