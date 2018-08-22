import { Router } from 'express';
import { AccountService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  AccountService
    .findAllAccount(req.decoded.cif)
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
    let account  = {
        ACCBB 		: req.body.ACCBB,
        ACC 		: req.body.ACC,
        KETERANGAN 	: req.body.KETERANGAN,
		GOLONGAN 	: req.body.GOLONGAN,
        KU 			: req.body.KU,
        CIF 		: req.decoded.cif
    }
  AccountService
    .createAccount(account)
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
    const account  = {
        ACCBB 		: req.body.ACCBB,
        ACC 		: req.body.ACC,
        KETERANGAN 	: req.body.KETERANGAN,
		GOLONGAN 	: req.body.GOLONGAN,
        KU 			: req.body.KU,
        CIF 		: req.decoded.cif
    }
    console.log(account);
  AccountService
    .updateAccount(account,req.decoded.cif)
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
    let account	= {
        
        ACCBB 		: req.body.ACCBB,
        CIF 		: req.decoded.cif
    }
    console.log(account);
  AccountService
    .deleteAccount(account)
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