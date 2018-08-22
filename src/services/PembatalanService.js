import db from './../lib/db';
import moment from 'moment';

/**
 * Mengambil semua agama dari database
 */
const findAllPembatalan = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM v_mastersimp where CIF = ?" , [ cif ], (err, result) => {
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
const cariPembatalan = (param) => {
     return new Promise((resolve,reject) => {
        db.query("select * from v_mastersimp where NOSIMP = ? and KU = ? AND CIF = ? ",[ param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(result);
        });
    });
}

const pembatalanSetoran = (pembatalan , param) => {
     return new Promise((resolve,reject) => {
        db.query("UPDATE mastersimp SET debet = ? , saldo = ? where NOSIMP = ? AND KU = ? AND CIF = ?",[ pembatalan.DEBET - param.NOMINAL , pembatalan.SALDO - param.NOMINAL ,param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
             let pembatalanset = {
                TANGGAL : moment(new Date()).format(),
                NTRANS : '-',
                NOSIMP : pembatalan.NOSIMP,
                TGLSETOR : moment(new Date()).format(),
                KETERANGAN : param.KETERANGAN || '-',
                BERITA : param.BERITA || '-',
                DEBET : param.NOMINAL,
                KREDIT : 0,
                ST : 2,
                SALDO : pembatalan.SALDO - param.NOMINAL,
                UID : "-",
                KU : param.KU,
                CIF : param.CIF
            }
            insertPembatalanset(pembatalanset)
                .then(data => {
                    resolve(cariPembatalan(param));
                }).catch(err => {
                    reject(err)
                });
        });
    });
}

const insertPembatalanset = (pembatalan) => {


    return new Promise((resolve,reject) => {
        db.query("INSERT INTO transsimp set ?; INSERT INTO transaksi set ? ; ", pembatalan,  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(pembatalan);
        });
    });
}


const createPembatalan = (pembatalan) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO mastersimp set ?; ", pembatalan,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(pembatalan);
        });
    });
}

/**
 * Update Agama
 */
const updatePembatalan = (pembatalan,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE mastersimp SET ACC=?, TGLBUKA=?, TGLAKTIF=?, DEBET=?, KREDIT=?, SALDO=?, BLOKIR=?, KU=?,where NOSIMP = ? AND CIF = ? ',[pembatalan.ACC,pembatalan.TGLBUKA,pembatalan.TGLAKTIF,pembatalan.DEBET,pembatalan.KREDIT,pembatalan.SALDO,pembatalan.BLOKIR,pembatalan.KU,pembatalan.NOSIMP,CIF], function (err, results, fields) {
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
const deletePembatalan = (pembatalan) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM mastersimp WHERE NOSIMP = ?,KU = ? AND CIF = ?", [pembatalan.NOSIMP ,pembatalan.KU , pembatalan.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllPembatalan        : findAllPembatalan,
    createPembatalan         : createPembatalan,
    updatePembatalan         : updatePembatalan,
    deletePembatalan         : deletePembatalan,
    cariPembatalan           : cariPembatalan,
    pembatalanSetoran        : pembatalanSetoran
}

