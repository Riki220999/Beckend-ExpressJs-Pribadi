
import db from './../lib/db';



const cariPemblokiran = (param) => {
     return new Promise((resolve,reject) => {
        db.query("select * from v_mastersimp where NOSIMP = ? AND CIF = ? ",[ param.NOSIMP ,param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(result);
        });
    });
}

const setorPemblokiran = (param) => {
     return new Promise((resolve,reject) => {
        db.query("UPDATE mastersimp SET BLOKIR=? where NOSIMP = ? AND CIF = ?",[ param.NOMINAL , param.NOSIMP , param.CIF ],  function (err, result, fields) {
            if (err){
                reject(err);
            }
            resolve(cariPemblokiran(param));
        });
    });
}


module.exports = {
    
    cariPemblokiran       : cariPemblokiran,
    setorPemblokiran      : setorPemblokiran
}

