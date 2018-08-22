import { Router } from 'express';
import { TabunganService } from './../services';

const router = Router();

router.get("/detail",(req,res) => {
  TabunganService
    .findAllTabungan(req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: data
      });
    })
    .catch(err => {
      res.status(400)
        .json({
          status: 400,
          message : err
        })
    })

});

router.post("/insert",(req,res) => {
    let tabungan  = {
        NOSIMP    : req.body.NOSIMP,
        ACC       : req.body.ACC,
        CIB       : req.body.CIB,
        TGLBUKA   : req.body.TGLBUKA,
        TGLAKTIF  : req.body.TGLAKTIF,
        KU        : req.body.KU,
        CIF       : req.decoded.cif,
    }
  TabunganService
    .createTabungan(tabungan)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: data
      });
    })
    .catch(err => {
      res.status(400)
        .json({
          status: 400,
          message : err
        })
    })

});

router.put("/ubah",(req , res) => {
    const tabungan  = {
        ACC       : req.body.ACC,
        TGLBUKA   : req.body.TGLBUKA,
        TGLAKTIF  : req.body.TGLAKTIF,
        TGLBUKA   : req.body.TGLBUKA,
        DEBET     : req.body.DEBET,
        KREDIT    : req.body.KREDIT,
        SALDO     : req.body.SALDO,
        BLOKIR    : req.body.BLOKIR,
        KU        : req.body.KU,
        NOSIMP    : req.body.NOSIMP,
        CIF       : req.decoded.cif
    }
    console.log(tabungan);
  TabunganService
    .updateTabungan(tabungan,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: tabungan
      });
    })
    .catch(err => {
      res.status(400)
        .json({
          status: 400,
          message : err
        })
    })

});

router.delete("/hapus",(req , res) => {
    let tabungan  = {
        
        NOSIMP : req.body.NOSIMP,
        KU     : req.body.KU,
        CIF    : req.decoded.cif
    }
    console.log(tabungan);
  TabunganService
    .deleteTabungan(tabungan)
    .then(data => {
      res.status(200).json({
        status: 200,
        msg: "berhasil"
      });
    })
    .catch(err => {
      res.status(400)
        .json({
          status: 400,
          message : err
        })
    })

});

router.post("/setoran",(req,res) => {


    // 1. NOSIMP 
    // 2. NOMINAL 
    // CIF 
    // KU

    // CARI NOMOR SIMPANAN 
    // UPDATE SIMPANAN 
    // INSERT TRANSSIMP 


    // let setoranpokok  = {
    //     NOSIMP    : req.body.NOSIMP,
    //     ACC       : req.body.ACC,
    //     CIB       : req.body.CIB,
    //     TGLBUKA   : req.body.TGLBUKA,
    //     TGLAKTIF  : req.body.TGLAKTIF,
    //     KU        : req.body.KU,
    //     CIF       : req.decoded.cif,
    // }
  let param = {
      KU : req.body.KU,
      CIF: req.decoded.cif,
      NOSIMP: req.body.NOSIMP,
      NOMINAL: parseFloat(req.body.NOMINAL)
    };
  TabunganService
    .cariTabungan(param)
    .then(data => {
      if(data.length > 0){
          let tabungan = data[0];
          TabunganService
            .setorTabunganPokok(tabungan,param)
            .then(data => {
                  res.status(200).json({
                      status: 200,
                      data: data
                    });
            }).catch(err => {
                res.status(400).json({
                      status: 400,
                      msg: err
                    });
            })
          
      }else{
        res.status(400).json({
        status: 400,
        msg : "data tidak di temukan"
      });
      }
      
    })
    .catch(err => {
      res.status(400)
        .json({
          status: 400,
          message : err
        })
    })

});

module.exports = router;