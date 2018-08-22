import { Router } from 'express';
import { TransimService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  TransimService
    .findAllTransim(req.decoded.cif)
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
  TransimService.generateKodeTransim(req.decoded.cif)
    .then(result => {
      console.log(result);
      let transim  = {
            IDE         : result,
            TANGGAL     : req.body.TANGGAL,
            NTRANS      : req.body.NTRANS,
            NOSIMP      : req.body.NOSIMP,
            TGLSETOR    : req.body.TGLSETOR,
            KETERANGAN  : req.body.KETERANGAN,
            BERITA      : req.body.BERITA,
            DEBET       : req.body.DEBET,
            KREDIT      : req.body.KREDIT,
            ST          : req.body.ST,
            SALDO       : req.body.SALDO,
            TSALDO      : req.body.TSALDO,
            BUSIMP      : req.body.BUSIMP,
            PRT         : req.body.PRT,
            UID         : req.body.UID,
            KU          : req.body.KU,
            CIF         : req.decoded.cif
        }
       TransimService
        .createTransim(transim)
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
      }).catch(err => {
        res.status(400)
            .json({
              status: 400,
              message : err
            })
      })
});

module.exports = router;