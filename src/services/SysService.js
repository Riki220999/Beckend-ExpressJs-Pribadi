import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllSys = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_sys where cif = ?" , [ cif ], (err, result) => {
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
const createSys = (sys) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_sys set ? ", sys,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(sys);
        });
    });
}

/**
 * Update Agama
 */
const updateSys = (sys,cif) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_sys SET LR =?,LRBL =?,LRTL =?,LRBA =?,KU =? where id = ? AND CIF = ? ',[sys.LR,sys.LRBL,sys.LRTL,sys.LRBA,sys.KU,sys.id,cif], function (err, results, fields) {
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
const deleteSys = (sys) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_sys WHERE id = ? AND CIF = ?", [sys.id , sys.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllSys    : findAllSys,
    createSys     : createSys,
    updateSys     : updateSys,
    deleteSys     : deleteSys
}

