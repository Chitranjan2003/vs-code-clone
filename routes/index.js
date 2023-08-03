var express = require('express');
var router = express.Router();
var fs= require("fs")
 
router.get('/',function(req,res){
  fs.readdir("./uploads",{withFileTypes:true},function(err,files){
    res.render('index' , {files:files}); 
  })
})
router.get(`/back`,function(req,res){
  res.redirect("back")
})

router.get('/file/:filename', function(req, res) {
  fs.readdir(`./uploads`, {withFileTypes: true}, function(err, files){
    fs.readFile(`./uploads/${req.params.filename}`,"utf8",function(err,filedata){
      res.render("opened", {files,filename: req.params.filename,filedata});

    })
  })
});
 
router.post('/update/:filename', function(req, res) {
  fs.writeFile(`./uploads/${req.params.filename}`, req.body.data, function(err){
    res.redirect("back");
  })
});
router.post('/rename/:filename', function(req, res) {
  fs.rename(`./uploads/${req.params.filename}`,`./uploads/${req.body.newname}`,function(err){
    if(err) res.send(err)
    else res.redirect("back")
  })
});
router.get('/delete/:type/:filename', function(req, res) {
  if(req.params.type === "folder"){
    fs.rmdir(`./uploads/${req.params.filename}`, function(err){
      res.redirect("back");
    })
  }
  else{
    fs.unlink(`./uploads/${req.params.filename}`, function(err){
      res.redirect("back");
    })
  }
});
 
router.get('/creatfile', function(req, res) {
  fs.writeFile(`./uploads/${req.query.filename}`, "",function(err){
    if(err) res.send(err)
    else res.redirect("back")
  })
});

router.get('/creatfolder', function(req, res) {
  fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
    if(err) res.send(err)
    else res.redirect("back")
  })
});

module.exports = router;