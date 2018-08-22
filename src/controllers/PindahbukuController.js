import { Router } from 'express';
import { PindahbukuService } from './../services';

const router = Router();


router.post("/pindah_buku",(req,res) => {
let param = {
      KU : req.body.KU,
      CIF: req.decoded.cif,
      NOSIMP: req.body.NOSIMP,
      NOMINAL: parseFloat(req.body.NOMINAL)
    };
  PindahbukuService
    .cariPindahbuku(param)
    .then(data => {
      if(data.length > 0){
          let simpanan = data[0];
          PindahbukuService
            .pindahbuku(simpanan,param)
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