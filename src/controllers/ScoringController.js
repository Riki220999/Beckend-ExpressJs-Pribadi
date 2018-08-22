import { Router } from 'express';
import { ScoringService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  ScoringService
    .findAllScoring(req.decoded.cif)
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


router.put("/scr",(req , res) => {
    const indikator  = {
        SC_MIN      : req.body.SC_MIN,
        SC_MAX       : req.body.SC_MAX,
        CIF       : req.decoded.cif
    }
    console.log(scoring);
  ScoringService
    .updateScoring(scoring,req.decoded.cif)
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