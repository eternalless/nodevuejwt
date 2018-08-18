import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import log4js from 'log4js';
import CONFIG from './config';
import api from './router/api'
// import errorHandler from './middleware/logger';

let app = express();

//中间件设置
app.use(cookieParser('sessionCaptcha'))
app.use(session({
    secret: 'sessionCaptcha', // 与cookieParser中的一致
    resave: true,
    saveUninitialized: true,
    name: 'USER_INFO_ID'
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// 路由
app.use('/', api)



//错误处理
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './logs/chen.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');
//只会记录error级别以上的错误
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
// errorHandler.error(app, logger)
//容错处理机制
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.error('记录日志', err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something blew up!' });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.send('你错了');
}
app.use(function (req, res, next) {
    if (res.status(404)) {
        res.send('Sorry cant find that!404')
    }else{
        next()
    }

})
var server = app.listen(CONFIG.get('port'), CONFIG.get('url'), () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});