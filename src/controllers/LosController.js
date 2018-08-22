import { Router } from 'express';
import { LosService } from './../services';
const router = Router();

router.get("/detail",(req,res) => {
  LosService
    .findAllLos(req.decoded.cif)
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
    let los  = {
        CIB                         : req.body.CIB,
        UMUR                        : req.body.NOKARTU,
        SCUMUR                      : req.body.NOGAJI,
        STS_PERNIKAHAN              : req.body.NIP,
        SCSTS_PERNIKAHAN            : req.body.NAMA,
        PEKERJAAN                   : req.body.KI,
        SCPEKERJAAN                 : req.body.PANGGILAN,
        PENDIDIKAN                  : req.body.KL,
        SCPENDIDIKAN                : req.body.TMP_LAHIR,
        JABATAN                     : req.body.TGL_LAHIR,
        SCJABATAN                   : req.body.ID,
        LAMA_BEKERJA                : req.body.NO_ID,
        SCLAMA_BEKERJA              : req.body.TGLEXPIRED,
        STS_TMPTINGGAL              : req.body.AGAMA,
        SCSTS_TMPTINGGAL            : req.body.PENDIDIKAN,
        DOMISILI                    : req.body.PEKERJAAN,
        SCDOMISILI                  : req.body.JABATAN,
        JML_TANGGUNGAN              : req.body.GOLONGAN,
        SCJML_TANGGUNGAN            : req.body.ALAMAT,
        PEKERJAAN_SUAMIISTRI        : req.body.TELEPON,
        SCPEKERJAAN_SUAMIISTRI      : req.body.HANDPHONE,
        JML_PINJAMAN                : req.body.E_MAIL,
        SCJML_PINJAMAN              : req.body.NAMAAHLIWARIS,
        USAHA_LAIN                  : req.body.HUBKEL,
        SCUSAHA_LAIN                : req.body.ALAMATAHLIWARIS,
        LAMA_USAHA                  : req.body.TGLBUKA,
        SCLAMA_USAHA                : req.body.ST,
        ASURANSI_KESEHATAN          : req.body.WAJIB,
        SCASURANSI_KESEHATAN        : req.body.POKOK,
        ASURANSI_JIWA               : req.body.TAMBAH_VOUCHER,
        SCASURANSI_JIWA             : req.body.PAKAI_VOUCHER,
        SUM_BOBOT                   : req.body.SALDO_VOUCHER,
        SUM_SCORE                   : req.body.TAMBAH_PLAFOND,
        TOTAL_SCORE                 : req.body.PAKAI_PLAFOND,
        TOTAL_BOBOT                 : req.body.SALDO_PLAFOND,
        HASIL_SCORING               : req.body.TAMBAH_COIN,
        KRITERIA                    : req.body.PAKAI_COIN,
        KETERANGAN_KRITERIA         : req.body.SALDO_COIN,
        GAJI_POKOK                  : req.body.TOTAL_BELANJA,
        TUNJANGAN                   : req.body.PENDIDIKAN,
        LEMBUR                      : req.body.PEKERJAAN,
        PENGHASILAN_TAMBAHAN_TOTAL  : req.body.JABATAN,
        GAJI_SUAMIISTRI             : req.body.GOLONGAN,
        PENGHASILAN_USAHA           : req.body.ALAMAT,
        PENGHASILAN_LAIN            : req.body.TELEPON,
        PENGHASILAN_LAIN_TOTAL      : req.body.HANDPHONE,
        KEBUTUHAN_HIDUP             : req.body.E_MAIL,
        KEBUTUHAN_LAIN              : req.body.NAMAAHLIWARIS,
        ANGSURAN_KOPERASI           : req.body.HUBKEL,
        PENGELUARAN_VARIABLE_TOTAL  : req.body.ALAMATAHLIWARIS,
        ANGSURAN_BANK               : req.body.TGLBUKA,
        ANGSURAN_LEASING            : req.body.ST,
        ANGSURAN_LAIN               : req.body.WAJIB,
        KEWAJIBAN_TOTAL             : req.body.POKOK,
        TOTAL_PEMASUKAN             : req.body.TAMBAH_VOUCHER,
        TOTAL_PENGELUARAN           : req.body.PAKAI_VOUCHER,
        SISA_PENGHASILAN            : req.body.SALDO_VOUCHER,
        PERSENTASE_ANGSURAN         : req.body.TAMBAH_PLAFOND,
        MAKSIMAL_ANGSURAN           : req.body.PAKAI_PLAFOND,
        ST                          : req.body.SALDO_PLAFOND,
        CIF                         : req.decoded.cif
    

    }
  LosService
    .createLos(los)
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