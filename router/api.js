import {Router} from 'express'
import jwt from 'jsonwebtoken'
import retoken from './retoken'
import indexController from '../controllers'

const router = Router()
//设置跨域
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Request-Headers:content-type,xfilecategory,xfilename,xfilesize");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});
//添加token认证
router.use(retoken)

//登录
router.use('/login', (req, res, next) => {
  console.log(111)
  const userToken = {
    name: '1',
    loginAt: +new Date
  }
  //签发token 指定过期时间2h
  const token = jwt.sign(userToken, 'chen', { expiresIn: '2h' });
  res.json({
    code: 200,
    data: token
  })
})

router.use('/index', (req, res, next) => {
    res.json({
        code: 200,
        data: 'henhao'
    })
})
//路由
router.use('/user',indexController)
export default router