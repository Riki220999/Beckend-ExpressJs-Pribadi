import { Router } from 'express';
import { AcckelService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  AcckelService
    .findAllAcckel(req.decoded.cif)
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
    let acckel  = {
        ACCJENIS 	: req.body.ACCJENIS,
        ACCKEL 		: req.body.ACCKEL,
        KELOMPOK 	: req.body.KELOMPOK,
		GOL 		: req.body.GOL,
        SUBGOL 		: req.body.SUBGOL,
        CIF 		: req.decoded.cif
    }
  AcckelService
    .createAcckel(acckel)
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
    const acckel  = {
        ACCJENIS 	: req.body.ACCJENIS,
        ACCKEL 		: req.body.ACCKEL,
        KELOMPOK 	: req.body.KELOMPOK,
		GOL 		: req.body.GOL,
        SUBGOL 		: req.body.SUBGOL,
        CIF 		: req.decoded.cif
    }
    console.log(acckel);
  AcckelService
    .updateAcckel(acckel,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: acckel
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
    let acckel	= {
        
        ACCKEL 	: req.body.ACCKEL,
        CIF 		: req.decoded.cif
    }
    console.log(acckel);
  AcckelService
    .deleteAcckel(acckel)
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