import { Router } from 'express';
import { UnitService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  UnitService
    .findAllUnit(req.decoded.cif)
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
    let unit  = {
        ID 			: req.body.ID,
        JENIS		: req.body.JENIS,
        KU 			: req.body.KU,
		NAMA_UNIT	: req.body.NAMA_UNIT,
		SYS			: req.body.SYS,
		ST			: req.body.ST,
        CIF 		: req.decoded.cif
    }
  UnitService
    .createUnit(unit)
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
    const unit  = {
        ID 			: req.body.ID,
        JENIS		: req.body.JENIS,
        KU 			: req.body.KU,
		NAMA_UNIT	: req.body.NAMA_UNIT,
		SYS			: req.body.SYS,
		ST			: req.body.ST,
        CIF 		: req.decoded.cif
    }
    console.log(unit);
  UnitService
    .updateUnit(unit,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status	: 200,
        data	: unit
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
    let unit	= {
        
        ID 			: req.body.ID,
        CIF 		: req.decoded.cif
    }
    console.log(cif);
  SysService
    .deleteUnit(unit)
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