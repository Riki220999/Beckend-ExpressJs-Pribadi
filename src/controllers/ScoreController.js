import { Router } from 'express';
import { ScoreService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  ScoreService
    .findAllScore(req.decoded.cif)
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
        UKUR      : req.body.UKUR,
        MIN       : req.body.MIN,
        MAX       : req.body.MAX,
        INDIKATOR : req.body.INDIKATOR,
        CIF       : req.decoded.cif
    }
    console.log(score);
  ScoreService
    .updateScore(score,req.decoded.cif)
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