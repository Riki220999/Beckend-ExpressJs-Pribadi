import { Router } from 'express';
import { UserService } from './../services';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from './../config.json';

import Joi from 'joi';


const router = Router();


router.post("/login", (req , res) => {
    let scheme = Joi.object().keys({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().required()
    });
  const isValid = Joi.validate(req.body, scheme);
  if(isValid.error !== null){
    res.status(400).json({
        status: 400,
        msg: "",
        validation: isValid.error.details
    });
    return;
  }
  UserService
    .findUserByUid(req.body.username)
    .then(data =>  {
      if (md5(req.body.password) == data.PASSWORD) {
        let payload = {
            cif: data.CIF,
            nama: data.NAMA,
            
            bagian: data.BAGIAN,
            jabatan: data.JABATAN,
            issued_at: moment(new Date()).format(),
            expired_at : moment(new Date()).add(24, 'hours').format()
        }
        let token = jwt.sign(payload, config.screat, {
            expiresIn: '24h'
        });
        res.status(200).json(Object.assign(payload, {
            status: 200,
            token: token
        }));

      } else {
          res.status(401).json({
              status: 401,
              msg: "Username / Password anda Salah"
          });
      }
    }).catch(function(error) {
      res.status(401)
        .json({
          status: 401,
          message : "Username / Password Tidak Valid"
        })
    });
});
module.exports = router;