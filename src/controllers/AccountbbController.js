import { Router } from 'express';
import { AccountbbService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  AccountbbService
    .findAllAccountbb(req.decoded.cif)
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
    let accountbb  = {
        ACCKEL 		: req.body.ACCKEL,
        ACCBB 		: req.body.ACCBB,
        BUKUBESAR 	: req.body.BUKUBESAR,
		KATEGORI	: req.body.KATEGORI,
        GOLONGAN	: req.body.GOLONGAN,
        RESIKO		: req.body.RESIKO,
		CIF 		: req.decoded.cif
    }
  AccountbbService
    .createAccountbb(accountbb)
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
    const accountbb  = {
        ACCKEL 		: req.body.ACCKEL,
        ACCBB 		: req.body.ACCBB,
        BUKUBESAR 	: req.body.BUKUBESAR,
		KATEGORI	: req.body.KATEGORI,
        GOLONGAN	: req.body.GOLONGAN,
        RESIKO		: req.body.RESIKO,
		CIF 		: req.decoded.cif
    }
    console.log(accountbb);
  AccountbbService
    .updateAccountbb(accountbb,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: account
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
    let accountbb	= {
        
        ACCBB 		: req.body.ACCBB,
        CIF 		: req.decoded.cif
    }
    console.log(accountbb);
  AccountbbService
    .deleteAccountbb(accountbb)
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