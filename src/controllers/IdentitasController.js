import { Router } from 'express';
import { IdentitasService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  IdentitasService
    .findAllIdentitas(req.decoded.cif)
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
    let identitas = {
        URUT : req.body.URUT,
        IDENTITAS : req.body.IDENTITAS,
        CIF : req.decoded.cif
    }
    IdentitasService
    .createIdentitas(identitas)
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
    const identitas  = {
        URUT : req.body.URUT,
        IDENTITAS : req.body.IDENTITAS,
        CIF : req.decoded.cif
    }
    console.log(identitas);
  IdentitasService
    .updateIdentitas(identitas,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: identitas
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
    let identitas  = {
        
        IDENTITAS : req.body.IDENTITAS,
        CIF : req.decoded.cif
    }
    console.log(identitas);
  IdentitasService
    .deleteIdentitas(identitas)
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