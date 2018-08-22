
import db from './../lib/db';
import moment from 'moment';

/**
 * Mengambil semua agama dari database
 */
const findAllTabungan = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM mastersimp where CIF = ?" , [ cif ], (err, result) => {
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
const cariTabungan = (param) => {
     return new Promise((resolve,reject) => {
        db.query("select * from v_mastersimp where NOSIMP = ? and KU = ? AND CIF = ? ",[ param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(result);
        });
    });
}

const setorTabunganPokok = (tabungan , param) => {
     return new Promise((resolve,reject) => {
        db.query("UPDATE mastersimp SET kredit = ? , saldo = ? where NOSIMP = ? AND KU = ? AND CIF = ?",[ tabungan.KREDIT + param.NOMINAL , tabungan.SALDO + param.NOMINAL ,param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
             let trantab = {
                TANGGAL : moment(new Date()).format(),
                NTRANS : '-',
                NOSIMP : tabungan.NOSIMP,
                TGLSETOR : moment(new Date()).format(),
                KETERANGAN : param.KETERANGAN || '-',
                BERITA : param.BERITA || '-',
                DEBET : 0,
                KREDIT : param.NOMINAL,
                ST : 2,
                SALDO : tabungan.SALDO + param.NOMINAL,
                UID : "-",
                KU : param.KU,
                CIF : param.CIF
            }
            insertTrantab(trantab)
                .then(data => {
                    resolve(cariTabungan(param));
                }).catch(err => {
                    reject(err)
                });
        });
    });
}

const insertTrantab = (tabungan) => {


    return new Promise((resolve,reject) => {
        db.query("INSERT INTO transsimp set ? ", tabungan,  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(tabungan);
        });
    });
}

const createTabungan = (tabungan) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO mastersimp set ? ", tabungan,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(tabungan);
        });
    });
}

/**
 * Update Agama
 */
const updateTabungan = (tabungan,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE mastersimp SET ACC=?, TGLBUKA=?, TGLAKTIF=?, DEBET=?, KREDIT=?, SALDO=?, BLOKIR=?, KU=?,where NOSIMP = ? AND CIF = ? ',[tabungan.ACC,tabungan.TGLBUKA,tabungan.TGLAKTIF,tabungan.DEBET,tabungan.KREDIT,tabungan.SALDO,tabungan.BLOKIR,tabungan.KU,tabungan.NOSIMP,CIF], function (err, results, fields) {
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
const deleteTabungan = (tabungan) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM mastersimp WHERE NOSIMP = ?,KU = ? AND CIF = ?", [tabungan.NOSIMP ,tabungan.KU , tabungan.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllTabungan    : findAllTabungan,
    createTabungan     : createTabungan,
    updateTabungan     : updateTabungan,
    deleteTabungan     : deleteTabungan,
    cariTabungan       : cariTabungan,
    setorTabunganPokok: setorTabunganPokok
}

