let indexModel={
  //这里操作数据库
  getData:function (cb) {
    var data = {
      code:200,
      data:{
        username:111,
        password:222
      }
    }
    cb(data)
  }
}
module.exports=indexModel