import { Router } from 'express';
import { AccjenisService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  AccjenisService
    .findAllAccjenis(req.decoded.cif)
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
    let accjenis  = {
        ACCJENIS 	: req.body.ACCJENIS,
        JENIS 		: req.body.JENIS,
        CIF 		: req.decoded.cif
    }
  AccjenisService
    .createAccjenis(accjenis)
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
    const accjenis  = {
        ACCJENIS 	: req.body.ACCJENIS,
        JENIS 		: req.body.JENIS,
        CIF 		: req.decoded.cif
    }
    console.log(accjenis);
  AccjenisService
    .updateAccjenis(accjenis,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: accjenis
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
    let accjenis	= {
        
        ACCJENIS 	: req.body.ACCJENIS,
        CIF 		: req.decoded.cif
    }
    console.log(accjenis);
  AccjenisService
    .deleteAccjenis(accjenis)
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