import { Router } from 'express';
import { DebetService } from './../services';

const router = Router();

router.get("/detail",(req,res) => {
  DebetService
    .findAllDebet(req.decoded.cif)
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
    let debet  = {
        NOSIMP    : req.body.NOSIMP,
        ACC       : req.body.ACC,
        CIB       : req.body.CIB,
        TGLBUKA   : req.body.TGLBUKA,
        TGLAKTIF  : req.body.TGLAKTIF,
        KU        : req.body.KU,
        CIF       : req.decoded.cif,
    }
  DebetService
    .createDebet(debet)
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
    const debet  = {
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
    console.log(debet);
  DebetService
    .updateDebet(debet,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: debet
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
    let debet  = {
        
        NOSIMP : req.body.NOSIMP,
        KU     : req.body.KU,
        CIF    : req.decoded.cif
    }
    console.log(debet);
  DebetService
    .deleteDebet(debet)
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

router.post("/penarikan",(req,res) => {


    
  let param = {
      KU : req.body.KU,
      CIF: req.decoded.cif,
      NOSIMP: req.body.NOSIMP,
      NOMINAL: parseFloat(req.body.NOMINAL)
    };
  DebetService
    .cariDebet(param)
    .then(data => {
      if(data.length > 0){
          let debet = data[0];
          DebetService
            .setorPenarikanDebet(debet,param)
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