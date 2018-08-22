
import db from './../lib/db';

const Approvesimpan = (approvesimpan) =>{
    return new Promise((resolve,reject) => {
        db.query('UPDATE v_mastersimp SET ST=? where CIB = ? AND CIF = ? AND NOSIMP ',[approvesimpan.ST,approvesimpan.CIB,approvesimpan.NOSIMP,CIF],function (err, result, fields) {
           if(err){
                reject(err);
           }
            resolve(result);
        });
    });
}


module.exports = {
    
}

