import { Router } from 'express';
import { SysService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  SysService
    .findAllSys(req.decoded.cif)
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
    let sys  = {
        id 		: req.body.id,
        LR		: req.body.LR,
        LRBL 	: req.body.LRBL,
		LRTL 	: req.body.LRTL,
		LRBA 	: req.body.LRBA,
		KU		: req.body.KU,
        CIF 	: req.decoded.cif
    }
  SysService
    .createSys(sys)
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
    const sys  = {
        id 		: req.body.id,
        LR		: req.body.LR,
        LRBL 	: req.body.LRBL,
		LRTL 	: req.body.LRTL,
		LRBA 	: req.body.LRBA,
		KU		: req.body.KU,
        CIF 	: req.decoded.cif
    }
  SysSer
    console.log(sys);
  SysService
    .updateSys(sys,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status	: 200,
        data	: sys
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
    let sys	= {
        
        id 			: req.body.id,
        CIF 		: req.decoded.cif
    }
    console.log(cif);
  SysService
    .deleteSys(sys)
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