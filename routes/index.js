var fs = require('fs');

exports.index = function(req, res){
  res.render('index', { title: 'image-crop' });
};

exports.crop_image = function(req, res){
  console.log(req.body);

  console.log("file", req.files.image.name);

  fs.readFile(req.files.image.path, function(err, data){
    var imageName = req.files.image.name;

    if(!imageName) {
      console.log("ERROR");
      res.redirect('/');
      res.end();
    } else {
      var newPath = __dirname + "/uploads/full/" + imageName;
      console.log("Path:", newPath);
      fs.writeFile(newPath, data, function(err) {
        if (err) {
          console.log("ERROR:", err);
          res.redirect('/');
        } else {
          res.redirect('/uploads/full/' + imageName);
        }
      });
    }
  });
};
