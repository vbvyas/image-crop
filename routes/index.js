var fs = require('fs');

exports.index = function(req, res){
  res.render('index', { title: 'image-crop' });
};

exports.crop_image = function(req, res){
  console.log(req.body);

  console.log("file", req.files.image.name);


  res.redirect('/');
};
