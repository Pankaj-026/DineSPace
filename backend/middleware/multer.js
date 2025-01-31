const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({
    storage: multer.diskStorage({
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
    fileFilter: function (req, file, cb) {
      // Accept only images
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed!"), false);
      }
      cb(null, true);
    },
  });
  

module.exports = upload;