
import db from './../lib/db';

/**
 * Mengambil semua agama dari database
 */
const findUserByUid = (uid) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM uid where UID = ?" , [ uid ], (err, result) => {
            if(err) {
                reject(err);
            }
            resolve(result[0]);
        })
    });
}


module.exports = {
    findUserByUid    : findUserByUid
}

