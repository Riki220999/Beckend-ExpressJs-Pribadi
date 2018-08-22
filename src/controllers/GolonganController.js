import { Router } from 'express';
import { GolonganService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  GolonganService
    .findAllGolongan(req.decoded.cif)
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
    let golongan  = {
        NO 			: req.body.NO,
        GOLONGAN 	: req.body.GOLONGAN,
        PANGKAT 	: req.body.PANGKAT,
		POKOK 		: req.body.POKOK,
        WAJIB 		: req.body.WAJIB,
        CIF 		: req.decoded.cif
    }
  GolonganService
    .createGolongan(golongan)
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
    const  golongan  = {
        NO 			: req.body.NO,
        GOLONGAN 	: req.body.GOLONGAN,
        PANGKAT 	: req.body.PANGKAT,
		POKOK 		: req.body.POKOK,
        WAJIB 		: req.body.WAJIB,
        CIF 		: req.decoded.cif
    }
    console.log(golongan);
  GolonganService
    .updateGolongan(golongan,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: golongan
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
    let golongan	= {
        
        GOLONGAN 	: req.body.GOLONGAN,
        CIF 		: req.decoded.cif
    }
    console.log(golongan);
  GolonganService
    .deleteGolongan(golongan)
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