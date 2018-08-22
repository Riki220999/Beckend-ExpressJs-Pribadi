import { Router } from 'express';
import { InstansiService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  InstansiService
    .findAllInstansi(req.decoded.cif)
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
  InstansiService.generateKodeInstansi(req.decoded.cif)
    .then(result => {
      console.log(result);
      let instansi  = {
            KI            : result,
            NAMA_INSTANSI : req.body.NAMA_INSTANSI,
            ALAMAT        : req.body.ALAMAT,
            TELEPON       : req.body.TELEPON,
            HANDPHONE     : req.body.HANDPHONE,
            NAMA_BENDAHARA: req.body.NAMA_BENDAHARA,
            TELEPON_BENDAHARA : req.body.TELEPON_BENDAHARA,
            CIF           : req.decoded.cif
        }
      InstansiService
        .createInstansi(instansi)
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
      }).catch(err => {
        res.status(400)
            .json({
              status: 400,
              message : err,
              error: err
            })
      })
    

});

router.put("/ubah",(req , res) => {
    const instansi  = {
        KI            : req.body.KI,
        NAMA_INSTANSI : req.body.NAMA_INSTANSI,
        ALAMAT        : req.body.ALAMAT,
        TELEPON       : req.body.TELEPON,
        HANDPHONE     : req.body.HANDPHONE,
        NAMA_BENDAHARA: req.body.NAMA_BENDAHARA,
        TELEPON_BENDAHARA : req.body.TELEPON_BENDAHARA,
        CIF           : req.decoded.cif
    }
    console.log(instansi);
  InstansiService
    .updateInstansi(instansi,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: instansi
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
    let instansi  = {
        
        KI : req.body.KI,
        CIF : req.decoded.cif
    }
    console.log(instansi);
  InstansiService
    .deleteInstansi(instansi)
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