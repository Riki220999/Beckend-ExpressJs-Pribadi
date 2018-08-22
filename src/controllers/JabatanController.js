import { Router } from 'express';
import { JabatanService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  JabatanService
    .findAllJabatan(req.decoded.cif)
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
    let jabatan  = {
        URUT : req.body.URUT,
        JABATAN : req.body.JABATAN,
        CIF : req.decoded.cif
    }
  JabatanService
    .createJabatan(jabatan)
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
    const jabatan  = {
        URUT : req.body.URUT,
        JABATAN : req.body.JABATAN,
        CIF : req.decoded.cif
    }
    console.log(jabatan);
  JabatanService
    .updateJabatan(jabatan,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: jabatan
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
    let jabatan  = {
        
        JABATAN : req.body.JABATAN,
        CIF 	: req.decoded.cif
    }
    console.log(jabatan);
  JabatanService
    .deleteJabatan(jabatan)
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