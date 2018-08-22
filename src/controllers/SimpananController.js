import { Router } from 'express';
import { SimpananService } from './../services';

const router = Router();

router.get("/detail",(req,res) => {
  SimpananService
    .findAllSimpanan(req.decoded.cif)
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
    let simpanan  = {
        NOSIMP    : req.body.NOSIMP,
        ACC       : req.body.ACC,
        CIB       : req.body.CIB,
        TGLBUKA   : req.body.TGLBUKA,
        TGLAKTIF  : req.body.TGLAKTIF,
        KU        : req.body.KU,
        CIF       : req.decoded.cif,
    }
  SimpananService
    .createSimpanan(simpanan)
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
    const simpanan  = {
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
    console.log(simpanan);
  SimpananService
    .updateSimpanan(simpanan,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: simpanan
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
    let simpanan  = {
        
        NOSIMP : req.body.NOSIMP,
        KU     : req.body.KU,
        CIF    : req.decoded.cif
    }
    console.log(simpanan);
  SimpananService
    .deleteSimpanan(simpanan)
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

router.post("/setoran_pokok",(req,res) => {


    
  let param = {
      KU : req.body.KU,
      CIF: req.decoded.cif,
      NOSIMP: req.body.NOSIMP,
      NOMINAL: parseFloat(req.body.NOMINAL)
    };
  SimpananService
    .cariSimpanan(param)
    .then(data => {
      if(data.length > 0){
          let simpanan = data[0];
          SimpananService
            .setorSimpananPokok(simpanan,param)
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