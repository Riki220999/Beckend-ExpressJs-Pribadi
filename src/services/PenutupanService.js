import db from './../lib/db';
import moment from 'moment';


const cariPenutupan = (param) => {
     return new Promise((resolve,reject) => {
        db.query("select * from v_mastersimp where NOSIMP = ? and KU = ? AND CIF = ? ",[ param.NOSIMP ,param.KU , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(result);
        });
    });
}

const penutupanSimpanan = (penutupan , param) => {
     return new Promise((resolve,reject) => {
        db.query("UPDATE mastersimp SET debet = ? , saldo = ? where NOSIMP = ? AND KU = ? AND CIF = ?",[ penutupan.DEBET - param.NOMINAL , penutupan.SALDO - param.NOMINAL ,param.NOSIMP ,param.KU , param.CIF],  function (err, result, fields) {
            if (err){
                reject(err);
            }
             let penutupansimp = {
                TANGGAL     : moment(new Date()).format(),
                NTRANS      : '-',
                NOSIMP      : penutupan.NOSIMP,
                TGLSETOR    : moment(new Date()).format(),
                KETERANGAN  : param.KETERANGAN || '-',
                BERITA      : param.BERITA || '-',
                DEBET       : param.NOMINAL,
                KREDIT      : 0,
                ST          : 3,
                SALDO       : penutupan.SALDO - param.NOMINAL,
                UID         : "-",
                KU          : param.KU,
                CIF         : param.CIF
            }
            insertPenutupansimp(penutupansimp)
                .then(data => {
                    resolve(cariPenutupan(param));
                }).catch(err => {
                    reject(err)
                });
        });
    });
}

const insertPenutupansimp = (penutupan) => {


    return new Promise((resolve,reject) => {
        db.query("INSERT INTO transsimp set ? ", penutupan,  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(penutupan);
        });
    });
}


module.exports = {
    cariPenutupan           : cariPenutupan,
    penutupanSimpanan       : penutupanSimpanan
}

