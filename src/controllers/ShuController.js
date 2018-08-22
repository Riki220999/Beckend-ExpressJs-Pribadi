import { Router } from 'express';
import { ShuService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  ShuService
    .findAllShu(req.decoded.cif)
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
    let shu  = {
        modal 		: req.body.ACCBB,
        pengurus	: req.body.ACC,
        anggota 	: req.body.KETERANGAN,
		karyawan 	: req.body.GOLONGAN,
        cif 		: req.decoded.cif
    }
  ShuService
    .createShu(shu)
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
    const shu  = {
        modal 		: req.body.ACCBB,
        pengurus	: req.body.ACC,
        anggota 	: req.body.KETERANGAN,
		karyawan 	: req.body.GOLONGAN,
        cif 		: req.decoded.cif
    }
    console.log(shu);
  ShuService
    .updateShu(shu,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status	: 200,
        data	: shu
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
    let shu	= {
        
        modal 		: req.body.modal,
        cif 		: req.decoded.cif
    }
    console.log(cif);
  ShuService
    .deleteShu(shu)
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