const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let entity = null;
    if (req.body.email != null) {
      entity = 'user';
    } else {
      entity = 'article';
    }
    cb(null, `assets/images/${entity}`);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false)
  }
}

const setMulter = multer({ storage: fileStorage, fileFilter: fileFilter }).single('image');

module.exports = setMulter;