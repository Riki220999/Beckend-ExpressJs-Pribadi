
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findAllScore = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM dt_score_skala where CIF = ?" , [ cif ], (err, result) => {
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
const updateScore = (score,CIF) => {
    return new Promise((resolve,reject) => {
        db.query('UPDATE dt_score_skala SET UKUR=?, MIN=?, MAX=? where INDIKATOR = ? AND CIF = ? ',[score.UKUR,score.MIN,score.MAX,score.INDIKATOR,CIF], function (err, results, fields) {
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
    findAllScore    : findAllScore,
    updateScore     : updateScore
}

