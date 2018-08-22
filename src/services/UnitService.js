import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllUnit = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_unit where cif = ?" , [ cif ], (err, result) => {
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
const createUnit = (unit) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO dt_unit set ? ", unit,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(unit);
        });
    });
}

/**
 * Update Agama
 */
const updateUnit = (unit,cif) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_unit SET JENIS =?,KU =?,NAMA_UNIT =?,SYS =?,ST =? where ID = ? AND CIF = ? ',[unit.JENIS,unit.KU,unit.NAMA_UNIT,unit.SYS,unit.ST,unit.ID,cif], function (err, results, fields) {
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
const deleteUnit = (unit) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM dt_unit WHERE ID = ? AND CIF = ?", [unit.ID , unit.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllUnit    : findAllUnit,
    createUnit     : createUnit,
    updateUnit     : updateUnit,
    deleteUnit     : deleteUnit
}

