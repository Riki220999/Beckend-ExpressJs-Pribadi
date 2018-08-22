import { Router } from 'express';
import { KeluargaService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  KeluargaService
    .findAllKeluarga(req.decoded.cif)
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
    let keluarga  = {
        URUT 		: req.body.URUT,
        HUBKELUARGA : req.body.HUBKELUARGA,
        CIF 		: req.decoded.cif
    }
  KeluargaService
    .createKeluarga(keluarga)
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
    const keluarga  = {
        URUT 		: req.body.URUT,
        HUBKELUARGA : req.body.HUBKELUARGA,
        CIF 		: req.decoded.cif
    }
    console.log(keluarga);
  KeluargaService
    .updateKeluarga(keluarga,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: keluarga
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
    let keluarga	= {
        
        HUBKELUARGA : req.body.HUBKELUARGA,
        CIF 		: req.decoded.cif
    }
    console.log(keluarga);
  KeluargaService
    .deleteKeluarga(keluarga)
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