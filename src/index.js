import http from 'http';
import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import ProtectedApi from './api/protected';
import PublicApi from './api/public';

import config from './config.json';
import jwt from 'jsonwebtoken';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use('/emikro/auth', PublicApi());

app.use(express.static(path.join(__dirname, 'www')));


app.use(function(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.screat, function(err, decoded) {
            if (err) {
                return res.status(401).json({ success: false, message: 'UNAUTHORIZATION REQUEST' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(401).send({
            success: false,
            message: 'UNAUTHORIZATION REQUEST'
        });

    }
});
app.use('/emikro/v1', ProtectedApi());
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'www/index.html'));
});



app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
