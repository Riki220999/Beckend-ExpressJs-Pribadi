
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllScoring = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_scoring where CIF = ?" , [ cif ], (err, result) => {
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
const updateScoring = (scoring,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_scoring SET SC_MIN=?, SC_MAX=? where KRITERIA = ? AND CIF = ? ',[scoring.SC_MIN,scoring.SC_MAX,scoring.KRITERIA,CIF], function (err, results, fields) {
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
    findAllScoring    : findAllScoring,
    updateScoring     : updateScoring
}

