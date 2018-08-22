import { Router } from 'express';
import { PendidikanService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  PendidikanService
    .findAllPendidikan(req.decoded.cif)
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
    let pendidikan  = {
        URUT 		: req.body.URUT,
        PENDIDIKAN : req.body.PENDIDIKAN,
        CIF 		: req.decoded.cif
    }
  PendidikanService
    .createPendidikan(pendidikan)
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
    const pendidikan  = {
        URUT 		: req.body.URUT,
        PENDIDIKAN : req.body.PENDIDIKAN,
        CIF 		: req.decoded.cif
    }
    console.log(pendidikan);
  PendidikanService
    .updatePendidikan(pendidikan,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: pendidikan
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
    let pendidikan	= {
        
        PENDIDIKAN 	: req.body.PENDIDIKAN,
        CIF 		: req.decoded.cif
    }
    console.log(pendidikan);
  PendidikanService
    .deletePendidikan(pendidikan)
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