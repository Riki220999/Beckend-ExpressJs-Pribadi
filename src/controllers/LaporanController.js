import { Router } from 'express';
import { LaporanService } from './../services';
const router = Router();

router.get("/laporan",(req,res) => {
  LaporanService
    .findAllLaporan(req.decoded.cif)
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

router.get("/laporan_anggota",(req,res) => {
  LaporanService
    .findAllLaporananggota(req.decoded.cif)
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

router.get("/laporan_rekap",(req,res) => {
  LaporanService
    .findAllLaporanrekap(req.decoded.cif)
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


module.exports = router;