
import db from './../lib/db';
import moment from 'moment';

/**
 * Mengambil semua agama dari database
 */
const findAllSimpanan = (cif) => {
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
const cariSimpanan = (param) => {
     return new Promise((resolve,reject) => {
        db.query("select * from v_mastersimp where NOSIMP = ? and KU = ? AND CIF = ? ",[ param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(result);
        });
    });
}

const setorSimpananPokok = (simpanan , param) => {
     return new Promise((resolve,reject) => {
        db.query("UPDATE mastersimp SET kredit = ? , saldo = ? where NOSIMP = ? AND KU = ? AND CIF = ?",[ simpanan.KREDIT + param.NOMINAL , simpanan.SALDO + param.NOMINAL ,param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
             let transimp = {
                TANGGAL : moment(new Date()).format(),
                NTRANS : '-',
                NOSIMP : simpanan.NOSIMP,
                TGLSETOR : moment(new Date()).format(),
                KETERANGAN : param.KETERANGAN || '-',
                BERITA : param.BERITA || '-',
                DEBET : 0,
                KREDIT : param.NOMINAL,
                ST : 2,
                SALDO : simpanan.SALDO + param.NOMINAL,
                UID : "-",
                KU : param.KU,
                CIF : param.CIF
            }
            insertTransimp(transimp)
                .then(data => {
                    resolve(cariSimpanan(param));
                }).catch(err => {
                    reject(err)
                });
        });
    });
}

const insertTransimp = (simpanan) => {


    return new Promise((resolve,reject) => {
        db.query("INSERT INTO transsimp set ? ", simpanan,  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(simpanan);
        });
    });
}

const createSimpanan = (simpanan) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO mastersimp set ? ", simpanan,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(simpanan);
        });
    });
}

/**
 * Update Agama
 */
const updateSimpanan = (simpanan,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE mastersimp SET ACC=?, TGLBUKA=?, TGLAKTIF=?, DEBET=?, KREDIT=?, SALDO=?, BLOKIR=?, KU=?,where NOSIMP = ? AND CIF = ? ',[simpanan.ACC,simpanan.TGLBUKA,simpanan.TGLAKTIF,simpanan.DEBET,simpanan.KREDIT,simpanan.SALDO,simpanan.BLOKIR,simpanan.KU,simpanan.NOSIMP,CIF], function (err, results, fields) {
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
const deleteSimpanan = (simpanan) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM mastersimp WHERE NOSIMP = ?,KU = ? AND CIF = ?", [simpanan.NOSIMP ,simpanan.KU , simpanan.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllSimpanan    : findAllSimpanan,
    createSimpanan     : createSimpanan,
    updateSimpanan     : updateSimpanan,
    deleteSimpanan     : deleteSimpanan,
    cariSimpanan       : cariSimpanan,
    setorSimpananPokok: setorSimpananPokok
}

