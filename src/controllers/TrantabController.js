import { Router } from 'express';
import { TrantabService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  TrantabService
    .findAllTrantab(req.decoded.cif)
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
  TrantabService.generateKodeTrantab(req.decoded.cif)
    .then(result => {
      console.log(result);
      let trantab  = {
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
       TrantabService
        .createTrantab(trantab)
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