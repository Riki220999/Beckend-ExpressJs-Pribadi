import db from './../lib/db';
import moment from 'moment';

/**
 * Mengambil semua agama dari database
 */
const findAllDebet = (cif) => {
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
const cariDebet = (param) => {
     return new Promise((resolve,reject) => {
        db.query("select * from v_mastersimp where NOSIMP = ? and KU = ? AND CIF = ? ",[ param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(result);
        });
    });
}

const setorPenarikanDebet = (debet , param) => {
     return new Promise((resolve,reject) => {
        db.query("UPDATE mastersimp SET debet = ? , saldo = ? where NOSIMP = ? AND KU = ? AND CIF = ?",[ debet.DEBET - param.NOMINAL , debet.SALDO - param.NOMINAL ,param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
             let trandebet = {
                TANGGAL : moment(new Date()).format(),
                NTRANS : '-',
                NOSIMP : debet.NOSIMP,
                TGLSETOR : moment(new Date()).format(),
                KETERANGAN : param.KETERANGAN || '-',
                BERITA : param.BERITA || '-',
                DEBET : param.NOMINAL,
                KREDIT : 0,
                ST : 2,
                SALDO : debet.SALDO - param.NOMINAL,
                UID : "-",
                KU : param.KU,
                CIF : param.CIF
            }
            insertTrandebet(trandebet)
                .then(data => {
                    resolve(cariDebet(param));
                }).catch(err => {
                    reject(err)
                });
        });
    });
}

const insertTrandebet = (debet) => {


    return new Promise((resolve,reject) => {
        db.query("INSERT INTO transsimp set ? ", debet,  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(debet);
        });
    });
}

const createDebet = (debet) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO mastersimp set ? ", debet,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(debet);
        });
    });
}

/**
 * Update Agama
 */
const updateDebet = (debet,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE mastersimp SET ACC=?, TGLBUKA=?, TGLAKTIF=?, DEBET=?, KREDIT=?, SALDO=?, BLOKIR=?, KU=?,where NOSIMP = ? AND CIF = ? ',[debet.ACC,debet.TGLBUKA,debet.TGLAKTIF,debet.DEBET,debet.KREDIT,debet.SALDO,debet.BLOKIR,debet.KU,debet.NOSIMP,CIF], function (err, results, fields) {
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
const deleteDebet = (debet) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM mastersimp WHERE NOSIMP = ?,KU = ? AND CIF = ?", [debet.NOSIMP ,debet.KU , debet.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllDebet        : findAllDebet,
    createDebet         : createDebet,
    updateDebet         : updateDebet,
    deleteDebet         : deleteDebet,
    cariDebet           : cariDebet,
    setorPenarikanDebet : setorPenarikanDebet
}

