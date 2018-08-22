import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllStruktur = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_struktur where cif = ?" , [ cif ], (err, result) => {
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
const createStruktur = (struktur) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_struktur set ? ", struktur,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(struktur);
        });
    });
}

/**
 * Update Agama
 */
const updateStruktur = (struktur,cif) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_struktur SET JABATAN1 =?,NAMA2 =?,JABATAN2 =?,KU =? where NAMA1 = ? AND CIF = ? ',[struktur.JABATAN2,struktur.NAMA2,struktur.JABATAN2,struktur.KU,struktur.NAMA1,cif], function (err, results, fields) {
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
const deleteStruktur = (struktur) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_struktur WHERE NAMA1 = ? AND CIF = ?", [struktur.NAMA1 , struktur.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllStruktur    : findAllStruktur,
    createStruktur     : createStruktur,
    updateStruktur     : updateStruktur,
    deleteStruktur     : deleteStruktur
}

