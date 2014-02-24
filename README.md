image-crop
==========

A node.js + frontend javascript tool to crop images.

Requires imagemagick.

Install on ubuntu

```sh
  $ sudo apt-get install imagemagick
```

For the images to be saved locally on your server, create the following directories:

```sh
  $ md image-crop/routes/uploads/full
  $ md image-crop/routes/uploads/crop
  $ md image-crop/routes/uploads/thumb
```

To run:

```sh
  $ npm install
  $ node app.js
```

Navigate to [localhost:3000](localhost:3000) to upload and crop the image.
