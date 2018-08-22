import { Router } from 'express';
import { JenissimService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  JenissimService
    .findAllJenissim(req.decoded.cif)
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
    let jenissim  = {
        ACC       : req.body.ACC,
        BGA       : req.body.BGA,
        PJK       : req.body.PJK,
        SETAWAL   : req.body.SETAWAL,
        SETMIN    : req.body.SETMIN,
        MINTARIK  : req.body.MINTARIK,
        MAXTARIK  : req.body.MAXTARIK,
        SALMIN    : req.body.SALMIN,
        POT       : req.body.POT,
        SETORAN   : req.body.SETORAN,
        ADM       : req.body.ADM,
        ACCBGA    : req.body.ACCBGA,
        ACCPJK    : req.body.ACCPJK,
        ACCADM    : req.body.ACCADM,
        ACCPOT    : req.body.ACCPOT,
        PB        : req.body.PB,
        ST        : req.body.ST,
        KST       : req.body.KST,
        CIF       : req.decoded.cif
    }
  JenissimService
    .createJenissim(jenissim)
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
    const jenissim  = {
        ACC       : req.body.ACC,
        BGA       : req.body.BGA,
        PJK       : req.body.PJK,
        SETAWAL   : req.body.SETAWAL,
        SETMIN    : req.body.SETMIN,
        MINTARIK  : req.body.MINTARIK,
        MAXTARIK  : req.body.MAXTARIK,
        SALMIN    : req.body.SALMIN,
        POT       : req.body.POT,
        SETORAN   : req.body.SETORAN,
        ADM       : req.body.ADM,
        ACCBGA    : req.body.ACCBGA,
        ACCPJK    : req.body.ACCPJK,
        ACCADM    : req.body.ACCADM,
        ACCPOT    : req.body.ACCPOT,
        PB        : req.body.PB,
        ST        : req.body.ST,
        KST       : req.body.KST,
        CIF       : req.decoded.cif
    }
    console.log(jenissim);
  JenissimService
    .updateJenissim(jenissim,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: jenissim
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
    let jenissim  = {
        
        ACC : req.body.ACC,
        CIF : req.decoded.cif
    }
    console.log(jenissim);
  JenissimService
    .deleteJenissim(jenissim)
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
module.exports = router;