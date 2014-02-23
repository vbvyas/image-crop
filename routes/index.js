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
    var cropDimensions = util.format("%sx%s+%s+%s", width, height, x1, y1);
    console.log("crop dimensions:", cropDimensions);

    if(!imageName) {
      console.log("ERROR");
      res.redirect('/');
      res.end();
    } else {

      imageName = Number.random(100, 10000) + ".png";
      var newPath = __dirname + "/uploads/full/" + imageName;
      var cropPath = __dirname + "/uploads/crop/" + imageName;
      var thumbPath = __dirname + "/uploads/thumb/" + imageName;

      console.log("Path:", newPath);
      fs.writeFileSync(newPath, data);

      // resize to thumb size: 200px * 200px
      im.resize({
        srcPath: imagePath,
        dstPath: thumbPath,
        width: 200,
      }, function (err, stdout, stderr) {
        if (err) {
          console.log("image resizing error:" , err);
        }
      });

      var cropArgs = [
        imagePath,
        "-crop",
        cropDimensions,
        cropPath,
      ];

      im.convert(cropArgs, function(err) {
        if (err) {
          console.log("Crop ERROR:", err);
        } else {
          console.log("Image crop complete");
          res.redirect('/uploads/crop/' + imageName);
        }
      });

    }
  });
};
