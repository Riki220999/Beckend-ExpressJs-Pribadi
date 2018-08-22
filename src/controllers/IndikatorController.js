import { Router } from 'express';
import { IndikatorService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  IndikatorService
    .findAllIndikator(req.decoded.cif)
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


router.put("/ind",(req , res) => {
    const indikator  = {
        BOBOT       : req.body.BOBOT,
        ID          : req.body.ID,
        CIF         : req.decoded.cif
    }
    console.log(indikator);
  IndikatorService
    .updateIndikator(indikator,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: score
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