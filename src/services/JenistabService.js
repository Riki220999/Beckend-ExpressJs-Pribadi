
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllJenistab = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM jenissimp where CIF = ?" , [ cif ], (err, result) => {
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
const createJenistab = (jenistab) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO jenissimp set ? ", jenistab,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(jenistab);
        });
    });
}

/**
 * Update Agama
 */
const updateJenistab = (jenistab,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE jenissimp SET BGA=?, PJK=?, SETAWAL=?, SETMIN=?, MINTARIK=?, MAXTARIK=?, SALMIN=?, POT=?, SETORAN=?, ADM=?, ACCBGA=?, ACCPJK=?, ACCADM=?, ACCPOT=?, PB=?, ST=?, KST=?, where ACC = ? AND CIF = ? ',[jenistab.BGA,jenistab.PJK,jenistab.SETAWAL,jenistab.SETMIN,jenistab.MINTARIK,jenistab.MAXTARIK,jenistab.SALMIN,jenistab.POT,jenistab.SETORAN,jenistab.ADM,jenistab.ACCBGA,jenistab.ACCPJK,jenistab.ACCADM,jenistab.ACCPOT,jenistab.PB,jenistab.ST,jenistab.KST,jenistab.ACC,CIF], function (err, results, fields) {
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
const deleteJenistab = (jenistab) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM jenissimp WHERE ACC = ? AND CIF = ?", [jenistab.ACC , jenistab.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllJenistab    : findAllJenistab,
    createJenistab     : createJenistab,
    updateJenistab     : updateJenistab,
    deleteJenistab     : deleteJenistab
}

