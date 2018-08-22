import { Router } from 'express';
import { PekerjaanService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  PekerjaanService
    .findAllPekerjaan(req.decoded.cif)
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
    let pekerjaan  = {
        URUT 		: req.body.URUT,
        PEKERJAAN : req.body.PEKERJAAN,
        CIF 		: req.decoded.cif
    }
  PekerjaanService
    .createPekerjaan(pekerjaan)
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
    const pekerjaan  = {
        URUT 		: req.body.URUT,
        PEKERJAAN : req.body.PEKERJAAN,
        CIF 		: req.decoded.cif
    }
    console.log(pekerjaan);
  PekerjaanService
    .updatePekerjaan(pekerjaan,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: pekerjaan
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
    let pekerjaan	= {
        
        PEKERJAAN : req.body.PEKERJAAN,
        CIF 		: req.decoded.cif
    }
    console.log(pekerjaan);
  PekerjaanService
    .deletePekerjaan(pekerjaan)
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