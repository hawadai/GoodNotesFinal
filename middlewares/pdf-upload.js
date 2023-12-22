const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: "notes-data/pdfs",
    filename: function (req, file, cb) {
      cb(null, uuid() + "-" + file.originalname);
    },
  }),
});

const configureMulterMiddleware = upload.single("pdf");

module.exports = configureMulterMiddleware;
