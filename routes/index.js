var util = require('util');
var fs = require('fs');
var im = require('imagemagick');
require('sugar');

exports.index = function(req, res){
  res.render('index', { title: 'image-crop' });
};

exports.crop_image = function(req, res){
  fs.readFile(req.files.image.path, function(err, data){
    var imagePath = req.files.image.path;
    var imageName = req.files.image.name;
    var dimension = req.body;

    var cropDimensions = util.format("%sx%s!+%s+%s",
      dimension.width,
      dimension.height,
      dimension.x1,
      dimension.y1
    );

    if(!imageName) {
      res.redirect('/');
    } else {
      dstName = Number.random(100, 10000) + ".png";
      var newPath = __dirname + "/uploads/full/" + dstName;
      var cropPath = __dirname + "/uploads/crop/" + dstName;
      var thumbPath = __dirname + "/uploads/thumb/" + dstName;

      fs.writeFile(newPath, data, function(err) {
        if (err) {
          res.redirect('/');
        } else {

          // crop
          var cropArgs = [
            imagePath,
            "-crop",
            cropDimensions,
            cropPath
          ];

          im.convert(cropArgs, function(err) {

            // resize image to 400 x 300
            im.resize({
              srcPath: cropPath,
              dstPath: thumbPath,
              width: 400
            }, function (err, stdout, stderr) {
              res.redirect('/uploads/crop/' + dstName);
            });
          });
        }
      });
    }
  });
};
