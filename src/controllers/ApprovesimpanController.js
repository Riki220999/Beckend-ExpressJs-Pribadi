import { Router } from 'express';
import { ApprovesimpanService } from './../services';
const router = Router();

router.put("/approve_simpanan",(req , res) => {
    const approvesimpan  = {
        NOSIMP  : req.body.NOSIMP,
        ST      : req.body.ST,
        CIB     : req.body.CIB,
        CIF     : req.decoded.cif
    }
    console.log(approvesimpan);
  ApprovesimpanService
    .updateApprovesimpan(approvesimpan,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: cib
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

module.exports = router;