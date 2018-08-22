
import db from './../lib/db';

const findAllLaporan = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM v_transaksi where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

const findAllLaporananggota = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM v_laporan_per_rekening where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

const findAllLaporanrekap = (cif) => {
    return new Promise((resolve , reject) => {
        db.query("SELECT * FROM v_laporan_rekap where CIF = ?" , [ cif ], (err, result) => {
            if(err) {
                reject(err.message);
            }
            resolve(result);
        })
    });
}

module.exports = {
    findAllLaporan    : findAllLaporan
    
}

