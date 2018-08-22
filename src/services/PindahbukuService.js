
import db from './../lib/db';
import moment from 'moment';

/**
 * Mencari Simpanann
 */

const cariPindahbuku = (param) => {
     return new Promise((resolve,reject) => {
        db.query("select * from v_mastersimp where NOSIMP = ? and KU = ? AND CIF = ? ",
        [ param.NOSIMP ,param.KU , param.CIF ],
        function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(result);
        });
    });
}

const pindahbuku = (pindah , param) => {
     return new Promise((resolve,reject) => {
        db.query("UPDATE mastersimp SET debet = ? , saldo = ? where NOSIMP = ? AND KU = ? AND CIF = ?",
            [ 
             pindah.DEBET - param.NOMINAL ,
             pindah.SALDO - param.NOMINAL ,
             param.NOSIMP ,
             param.KU ,
             param.CIF 
            ],
              
        function (err, result, fields) {
            if (err){
                reject(err);
            }
             let pindahbuku1 = {
                TANGGAL : moment(new Date()).format(),
                NTRANS : '-',
                NOSIMP : pindah.NOSIMP,
                TGLSETOR : moment(new Date()).format(),
                KETERANGAN : param.KETERANGAN || '-',
                BERITA : param.BERITA || '-',
                DEBET : param.NOMINAL,
                KREDIT : 0,
                ST : 2,
                SALDO : pindah.SALDO - param.NOMINAL,
                UID : "-",
                KU : param.KU,
                CIF : param.CIF
            }
                 (pindahbuku1)
                .then(data => {
                    resolve(cariPindahbuku(param));
                }).catch(err => {
                    reject(err)
                });
        });
    });


        db.query("UPDATE mastersimp SET kredit = ? , saldo = ? where NOSIMP = ? AND KU = ? AND CIF = ?",
        [
         pindah.KREDIT + param.NOMINAL ,
         pindah.SALDO + param.NOMINAL ,
         param.NOSIMP ,
         param.KU ,
         param.CIF 
        ],
      function (err, result, fields) {
            if (err){
                reject(err);
            }
             let pindahbuku2 = {
                TANGGAL : moment(new Date()).format(),
                NTRANS : '-',
                NOSIM : pindah.NOSIMP,
                TGLSETOR : moment(new Date()).format(),
                KETERANGAN : param.KETERANGAN || '-',
                BERITA : param.BERITA || '-',
                DEBET : 0,
                KREDIT : param.NOMINAL,
                ST : 2,
                SALDO : pindah.SALDO + param.NOMINAL,
                UID : "-",
                KU : param.KU,
                CIF : param.CIF
            }
            insertTransimp(pindahbuku2)
                .then(data => {
                    resolve(cariPindahbuku(param));
                }).catch(err => {
                    reject(err)
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

module.exports = {
    cariPindahbuku        : cariPindahbuku,
    pindahbuku            : pindahbuku
}
