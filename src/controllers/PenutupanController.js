import { Router } from 'express';
import { PenutupanService } from './../services';

const router = Router();


router.post("/penutupan_simpanan",(req,res) => {
let param = {
      KU      : req.body.KU,
      CIF     : req.decoded.cif,
      NOSIMP  : req.body.NOSIMP,
      NOMINAL : parseFloat(req.body.NOMINAL)
    };
  PenutupanService
    .cariPenutupan(param)
    .then(data => {
      if(data.length > 0){
          let penutupan = data[0];
          PenutupanService
            .penutupanSimpanan(penutupan,param)
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