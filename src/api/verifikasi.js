import db from './../lib/db';

module.exports.verifikasi=function(req,res){
  
 
    var jenis=req.body.jenis;
    var versi_apl=req.body.versi_apl;
	var akses =req.body.akses;
    connection.query('SELECT * FROM dt_versi_apl WHERE jenis = ?',[jenis], function (error, results, fields) {
    
        if(results.length >0){
            if(versi_apl==results[0].versi_apl){
                res.json({
                    status:true,
                    

                   

                })
            }else{
                res.json({
                  status:false,
				  pesan:"Akses Dibawah Ini", 
				  data: {
                      
                      Akses : results[0].akses,
                      }
  				  
                 });
            }
         
        }
        
      
    });
}