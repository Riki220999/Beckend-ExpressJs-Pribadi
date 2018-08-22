
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllJenissim = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM v_jenissimp where CIF = ?" , [ cif ], (err, result) => {
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
const createJenissim = (jenissim) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO jenissimp set ? ", jenissim,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(jenissim);
        });
    });
}

/**
 * Update Agama
 */
const updateJenissim = (jenissim,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE jenissimp SET BGA=?, PJK=?, SETAWAL=?, SETMIN=?, MINTARIK=?, MAXTARIK=?, SALMIN=?, POT=?, SETORAN=?, ADM=?, ACCBGA=?, ACCPJK=?, ACCADM=?, ACCPOT=?, PB=?, ST=?, KST=?, where ACC = ? AND CIF = ? ',[jenissim.BGA,jenissim.PJK,jenissim.SETAWAL,jenissim.SETMIN,jenissim.MINTARIK,jenissim.MAXTARIK,jenissim.SALMIN,jenissim.POT,jenissim.SETORAN,jenissim.ADM,jenissim.ACCBGA,jenissim.ACCPJK,jenissim.ACCADM,jenissim.ACCPOT,jenissim.PB,jenissim.ST,jenissim.KST,jenissim.ACC,CIF], function (err, results, fields) {
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
const deleteJenissim = (jenissim) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM jenissimp WHERE ACC = ? AND CIF = ?", [jenissim.ACC , jenissim.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllJenissim    : findAllJenissim,
    createJenissim     : createJenissim,
    updateJenissim     : updateJenissim,
    deleteJenissim     : deleteJenissim
}

