require('sugar');

exports.index = function(req, res){
  res.render('index', { title: 'image-crop' });
};

exports.crop_image = function(req, res){
  console.log(req.body);
  console.log(req.body['coordinates']);
  console.log(Object.isString(req.body['coordinates']));

  res.redirect('/');
};
