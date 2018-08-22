
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllTrantab = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM transsimp where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

const generateKodeTrantab = (cif) => {
     return new Promise((resolve,reject) => {
        db.query("select max(ide) + 1 as IDE  from transsimp where cif = ?", [cif],  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(result[0]['IDE']);
        });
    });
}
/**
 * Membuat agama baru
 */
const createTrantab = (trantab) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO transsimp set ? ", trantab,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(trantab);
        });
    });
}

module.exports = {
    findAllTrantab      : findAllTrantab,
    createTrantab       : createTrantab,
    generateKodeTrantab : generateKodeTrantab
}

