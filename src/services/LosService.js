
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllLos = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM masterlos where CIF = ?" , [ cif ], (err, result) => {
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
const createLos = (los) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO los set ? ", los,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(cib);
        });
    });
}

module.exports = {
    findAllLos    : findAllLos,
    createLos     : createLos
    
}

