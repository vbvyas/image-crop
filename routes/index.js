require('sugar');

exports.index = function(req, res){
  res.render('index', { title: 'image-crop' });
};

exports.crop_image = function(req, res){
  console.log(req.body);

 res.redirect('/');
};
