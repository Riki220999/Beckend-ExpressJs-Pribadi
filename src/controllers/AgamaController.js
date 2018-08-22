import { Router } from 'express';
import { AgamaService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  AgamaService
    .findAllAgama(req.decoded.cif)
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
    let agama  = {
        URUT : req.body.URUT,
        AGAMA : req.body.AGAMA,
        CIF : req.decoded.cif
    }
  AgamaService
    .createAgama(agama)
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
    const agama  = {
        URUT : req.body.URUT,
        AGAMA : req.body.AGAMA,
        CIF : req.decoded.cif
    }
    console.log(agama);
  AgamaService
    .updateAgama(agama,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: agama
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
    let agama  = {
        
        AGAMA : req.body.AGAMA,
        CIF : req.decoded.cif
    }
    console.log(agama);
  AgamaService
    .deleteAgama(agama)
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