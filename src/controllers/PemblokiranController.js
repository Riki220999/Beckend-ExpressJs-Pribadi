import { Router } from 'express';
import { PemblokiranService } from './../services';

const router = Router();

router.post("/pemblokiran_saldo_simpanan",(req,res) => {
  let param = {
      CIF: req.decoded.cif,
      NOSIMP: req.body.NOSIMP,
      NOMINAL: parseFloat(req.body.NOMINAL)
    };
  PemblokiranService
    .setorPemblokiran(param)
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
  });

module.exports = router;