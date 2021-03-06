var express = require('express');
var router = express.Router();
var {Message} = require('../model/message.js');

//查找所有留言
router.get('/', function(req, res, next) {
  Message.findAll().then(function(msgs) {
      // res.render('index', { messages: msgs });
  });
});

//删除一个留言
router.get('/del_msg', function(req, res, next) {
  //如果没有id字段,返回404
  if (req.query.id == undefined ||req.query.id == '') {
      res.render('404', {});
      return;
  }
  //先查找,再调用删除,最后返回首页
  Message.findOne({
      where:{
          id:req.query.id
      }
  }).then(function(msg){
      msg.destroy().then(function(){
          console.log('delete success !!');
          res.redirect('/');
      });
  });
});

//添加一条留言
router.post('/add_msg',async (req, res, next)=> {
  //如果没有post数据或者数据为空,直接返回
  if (req.body.username == undefined ||req.body.username == ''
      || req.body.content == undefined || req.body.content == '') {
      res.render('404', {});
      return;
  }
  var message = {
      username: req.body.username,
      content: req.body.content
  };
  //创建一条记录,创建成功后跳转回首页
  var result = await Message.create(message);
  if(result){
    res.send({
      msg:'创建成功',
      code:0
    });
  }
});

//查找一个留言
router.get('/', function(req, res, next) {
  //如果没有id或者id为空,直接返回
  if (req.query.id == undefined || req.query.id == '') {
      res.render('404', {});
      return;
  }
  Message.findOne({
          where:{
              id:req.query.id
          }
  }).then(function(msg){
      res.render('edit', { message: msg });
  });
});

//更新一条留言
router.post('/update_msg', function(req, res, next) {
  //如果没有post数据或者数据为空,直接返回
  if (req.body.username == undefined ||req.body.username == ''
      || req.body.content == undefined || req.body.content == ''
      || req.body.id == undefined || req.body.id == '') {
      res.render('404', {});
      return;
  }
  var message = {
      username: req.body.username,
      content: req.body.content,
  };
  //创建一条记录,创建成功后跳转回首页
  Message.update(message,{
      where:{
          id:req.body.id
      }
  }).then(function(msg){
      console.log(msg);
      res.redirect('/');
  });
});

module.exports = router;

