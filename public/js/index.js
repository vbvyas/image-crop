jQuery(function($) {
  function triggerCropEvent(){
    $('img#loaded').imgAreaSelect({
      aspectRatio: '4:3',
      maxHeight: 600,
      minHeight: 600,
      maxWidth: 800,
      minWidth: 800,
      persistent: true,
      x1: 0,
      y1: 0,
      x2: 800,
      y2: 600,
      fadeSpeed: 200,
      resizeable: false,
      onSelectEnd: function (img, selection) {
        $('input[name="x1"]').val(selection.x1);
        $('input[name="y1"]').val(selection.y1);
        $('input[name="width"]').val(selection.width);            
        $('input[name="height"]').val(selection.height);            
      }
    });
  }

  function setImageSrc(theFile) {
    return function(e) {
      $('img#loaded').attr("src", e.target.result).load(triggerCropEvent);
    };
  }

  function handleFileSelect(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {

      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();
      reader.onload = setImageSrc(f);
      reader.readAsDataURL(f);
    }
  }

  $('#files').change(handleFileSelect);
});
