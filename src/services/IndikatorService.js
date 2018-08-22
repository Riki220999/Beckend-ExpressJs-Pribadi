
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllIndikator = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_score_bobot where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}


/**
 * Update Agama
 */
const updateIndikator = (indikator,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_score_bobot SET BOBOT=? where ID = ? AND CIF = ? ',[indikator.BOBOT,indikator.ID,CIF], function (err, results, fields) {
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

module.exports = {
    findAllIndikator    : findAllIndikator,
    updateIndikator     : updateIndikator
}

