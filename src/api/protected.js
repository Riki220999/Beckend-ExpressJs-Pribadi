import { Router } from 'express';
import {
    AgamaController,
    IdentitasController,
	JabatanController,
	KeluargaController,
	PekerjaanController,
	PendidikanController,
	GolonganController,
	AccjenisController,
	AcckelController,
	AccountController,
	AccountbbController,
	ShuController,
	StrukturController,
	SysController,
	UnitController,
	CibController,
	LosController,
	IndikatorController,
	ScoreController,
	ScoringController,
	SimpananController,
	InstansiController,
	JenissimController,
	TabunganController,
	JenistabController,
	TransimController,
	TrantabController,
	PemblokiranController,
	DebetController,
	ApprovesimpanController,
	PindahbukuController,
	PenutupanController,
	PembatalanController,
	LaporanController
	
} from './../controllers/';
export default () => {
    let api = Router();
    api.use('/agama', AgamaController);
    api.use('/identitas', IdentitasController);
	api.use('/jabatan', JabatanController);
	api.use('/keluarga', KeluargaController);
	api.use('/pekerjaan', PekerjaanController);
	api.use('/pendidikan', PendidikanController);
	api.use('/golongan', GolonganController);
	api.use('/setting/accjenis', AccjenisController);
	api.use('/setting/acckel', AcckelController);
	api.use('/setting/account', AccountController);
	api.use('/setting/accountbb', AccountbbController);
	api.use('/system/shu', ShuController);
	api.use('/system/struktur', StrukturController);
	api.use('/system/sys', SysController);
	api.use('/system/unit', UnitController);
	api.use('/master/cib', CibController);
	api.use('/masterlos', LosController);
	api.use('/indikator', IndikatorController);
	api.use('/score', ScoreController);
	api.use('/scoring', ScoringController);
	api.use('/simpanan', SimpananController);
	api.use('/instansi', InstansiController);
	api.use('/jenissim', JenissimController);
	api.use('/tabungan', TabunganController);
	api.use('/jenistab', JenistabController);
	api.use('/transaksi/simpanan', TransimController);
	api.use('/transaksi/tabungan', TrantabController);
	api.use('/pemblokiran', PemblokiranController);
	api.use('/debet', DebetController);
	api.use('/approve', ApprovesimpanController);
	api.use('/pindah', PindahbukuController);
	api.use('/penutupan', PenutupanController);
	api.use('/pembatalan', PembatalanController);
	api.use('/laporan', LaporanController);
	

    
    return api;

    
	
}