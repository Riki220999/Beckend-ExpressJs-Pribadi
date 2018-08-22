import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllShu = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_shu where cif = ?" , [ cif ], (err, result) => {
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
const createShu = (shu) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_shu set ? ", shu,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(shu);
        });
    });
}

/**
 * Update Agama
 */
const updateShu = (shu,cif) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_shu SET pengurus =?,anggota =?,karyawan =? where modal = ? AND cif = ? ',[shu.pengurus,shu.anggota,shu.karyawan,shu.modal,cif], function (err, results, fields) {
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
const deleteShu = (shu) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_shu WHERE modal = ? AND cif = ?", [shu.modal , shu.cif],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllShu    : findAllShu,
    createShu     : createShu,
    updateShu     : updateShu,
    deleteShu     : deleteShu
}

