
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllCib = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM cib where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

const generateKodeCib = (cif) => {
     return new Promise((resolve,reject) => {
        db.query("select max(cib) + 1 as CIB  from cib where cif = ?", [cif],  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(result[0]['CIB']);
        });
    });
}
/**
 * Membuat agama baru
 */
const createCib = (cib) => {
    return new Promise((resolve,reject) => {
        db.query("INSERT INTO cib set ? ", cib,  function (err, result, fields) {
        // if any error while executing above query, throw error
            if (err){
                reject(err);
            }
            resolve(cib);
        });
    });
}

/**
 * Update Agama
 */
const updateCib = (cib,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE cib SET NOKARTU=?, NAMA=?, NOGAJI=?, KI=?, TGL_LAHIR=?, NO_ID=?, PENDIDIKAN=?, PEKERJAAN=?, GOLONGAN=?, HANDPHONE=?, E_MAIL=?, NAMAAHLIWARIS=?, ALAMATAHLIWARIS=?, HUBKEL=? where CIB = ? AND CIF = ? ',[cib.NOKARTU,cib.NAMA,cib.NOGAJI,cib.KI,cib.TGL_LAHIR,cib.NO_ID,cib.PENDIDIKAN,cib.PEKERJAAN,cib.GOLONGAN,cib.HANDPHONE,cib.E_MAIL,cib.NAMAAHLIWARIS,cib.ALAMATAHLIWARIS,cib.HUBKEL,cib.CIB,CIF], function (err, results, fields) {
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
const deleteCib = (cib) =>{
    return new Promise((resolve,reject) => {
        db.query("DELETE FROM cib WHERE CIB = ? AND CIF = ?", [cib.CIB , cib.CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

/**
 * delete agama
 */
const approveCib = (cib) =>{
    return new Promise((resolve,reject) => {
        db.query('UPDATE cib SET ST=? where CIB = ? AND CIF = ? ',[cib.ST,cib.CIB,CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}

module.exports = {
    findAllCib      : findAllCib,
    createCib       : createCib,
    updateCib       : updateCib,
    deleteCib       : deleteCib,
    approveCib      : approveCib,
    generateKodeCib : generateKodeCib
}

