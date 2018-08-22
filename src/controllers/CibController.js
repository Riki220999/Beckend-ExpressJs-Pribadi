import { Router } from 'express';
import { CibService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  CibService
    .findAllCib(req.decoded.cif)
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
  CibService.generateKodeCib(req.decoded.cif)
    .then(result => {
      console.log(result);
      let cib  = {
        CIB           : res,
        NOKARTU       : req.body.NOKARTU,
        NOGAJI        : req.body.NOGAJI,
        NIP           : req.body.NIP,
        NAMA          : req.body.NAMA,
        KI            : req.body.KI,
        PANGGILAN     : req.body.PANGGILAN,
        KL            : req.body.KL,
        TMP_LAHIR     : req.body.TMP_LAHIR,
        TGL_LAHIR     : req.body.TGL_LAHIR,
        ID            : req.body.ID,
        NO_ID         : req.body.NO_ID,
        TGLEXPIRED    : req.body.TGLEXPIRED,
        AGAMA         : req.body.AGAMA,
        PENDIDIKAN    : req.body.PENDIDIKAN,
        PEKERJAAN     : req.body.PEKERJAAN,
        JABATAN       : req.body.JABATAN,
        GOLONGAN      : req.body.GOLONGAN,
        ALAMAT        : req.body.ALAMAT,
        TELEPON       : req.body.TELEPON,
        HANDPHONE     : req.body.HANDPHONE,
        E_MAIL        : req.body.E_MAIL,
        NAMAAHLIWARIS : req.body.NAMAAHLIWARIS,
        HUBKEL        : req.body.HUBKEL,
        ALAMATAHLIWARIS : req.body.ALAMATAHLIWARIS,
        TGLBUKA       : req.body.TGLBUKA,
        ST            : req.body.ST,
        WAJIB         : req.body.WAJIB,
        POKOK         : req.body.POKOK,
        TAMBAH_VOUCHER: req.body.TAMBAH_VOUCHER,
        PAKAI_VOUCHER : req.body.PAKAI_VOUCHER,
        SALDO_VOUCHER : req.body.SALDO_VOUCHER,
        TAMBAH_PLAFOND: req.body.TAMBAH_PLAFOND,
        PAKAI_PLAFOND : req.body.PAKAI_PLAFOND,
        SALDO_PLAFOND : req.body.SALDO_PLAFOND,
        TAMBAH_COIN   : req.body.TAMBAH_COIN,
        PAKAI_COIN    : req.body.PAKAI_COIN,
        SALDO_COIN    : req.body.SALDO_COIN,
        TOTAL_BELANJA : req.body.TOTAL_BELANJA,
        CIF           : req.decoded.cif
    
        }
      CibService
        .createCib(cib)
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
              message : err
            })
      })
    

});


router.put("/ubah",(req , res) => {
    const cib  = {
        NOKARTU         : req.body.NOKARTU,
        NAMA            : req.body.NAMA,
        NOGAJI          : req.body.NOGAJI,
        KI              : req.body.KI,
        TGL_LAHIR       : req.body.TGL_LAHIR,
        NO_ID           : req.body.NO_ID,
        PENDIDIKAN      : req.body.PENDIDIKAN,
        PEKERJAAN       : req.body.PEKERJAAN,
        GOLONGAN        : req.body.GOLONGAN,
        HANDPHONE       : req.body.HANDPHONE,
        E_MAIL          : req.body.E_MAIL,
        NAMAAHLIWARIS   : req.body.NAMAAHLIWARIS,
        ALAMATAHLIWARIS : req.body.ALAMATAHLIWARIS,
        HUBKEL          : req.body.HUBKEL,
        CIF             : req.decoded.cif
    }
    console.log(cib);
  CibService
    .updateCib(cib,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: cib
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
    let cib  = {
        
        CIB : req.body.CIB,
        CIF : req.decoded.cif
    }
    console.log(cib);
  CibService
    .deleteCib(cib)
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


router.put("/approve",(req , res) => {
    const cib  = {
        ST  : req.body.ST,
        CIB : req.body.CIB,
        CIF : req.decoded.cif
    }
    console.log(cib);
  CibService
    .updateCib(cib,req.decoded.cif)
    .then(data => {
      res.status(200).json({
        status: 200,
        data: cib
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