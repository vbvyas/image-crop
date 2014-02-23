var util = require('util');
var fs = require('fs');
var im = require('imagemagick');
require('sugar');

exports.index = function(req, res){
  res.render('index', { title: 'image-crop' });
};

exports.crop_image = function(req, res){
  console.log(req.body);

  console.log("file", req.files.image.name);

  fs.readFile(req.files.image.path, function(err, data){
    var imageName = req.files.image.name;
    var imagePath = req.files.image.path;

    var x1 = req.body.x1;
    var y1 = req.body.y1;
    var width = req.body.width;
    var height = req.body.height;
    var cropDimensions = util.format("%sx%s!+%s+%s", width, height, x1, y1);
    console.log("crop dimensions", cropDimensions);

    if(!imageName) {
      console.log("ERROR");
      res.redirect('/');
    } else {

      dstName = Number.random(100, 10000) + ".png";
      var newPath = __dirname + "/uploads/full/" + dstName;
      var cropPath = __dirname + "/uploads/crop/" + dstName;
      var thumbPath = __dirname + "/uploads/thumb/" + dstName;

      console.log("Path:", newPath);
      fs.writeFile(newPath, data, function(err) {
        if (err) {
          console.log("ERROR:", err);
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
            if (err) {
              console.log("Crop ERROR:", err);
            } else {
              console.log("Image crop complete");

              // resize image to 400 x 300
              im.resize({
                srcPath: cropPath,
                dstPath: thumbPath,
                width: 400
              }, function (err, stdout, stderr) {
                if (err) {
                  console.log("ERROR: resizing image");
                }
                console.log("Image resize complete");
                res.redirect('/uploads/crop/' + dstName);
              });
            }
          });
        }
      });
    }
  });
};
