import { Router } from 'express';
import { StrukturService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  StrukturService
    .findAllStruktur(req.decoded.cif)
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
    let struktur  = {
        NAMA1 		: req.body.NAMA1,
        JABATAN1	: req.body.JABATAN1,
        NAMA2 		: req.body.NAMA2,
		JABATAN2 	: req.body.JABATAN2,
		KU			: req.body.KU,
        CIF 		: req.decoded.cif
    }
  StrukturService
    .createStruktur(struktur)
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
    const struktur  = {
        NAMA1 		: req.body.NAMA1,
        JABATAN1	: req.body.JABATAN1,
        NAMA2 		: req.body.NAMA2,
		JABATAN2 	: req.body.JABATAN2,
		KU			: req.body.KU,
        CIF 		: req.decoded.cif
    }
    console.log(struktur);
  StrukturService
    .updateStruktur(struktur,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status	: 200,
        data	: struktur
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
    let struktur	= {
        
        NAMA1 		: req.body.NAMA1,
        cif 		: req.decoded.cif
    }
    console.log(cif);
  StrukturService
    .deleteStruktur(struktur)
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