import multer from "multer";

const storage = multer.diskStorage({
  //this multer can get file from the request
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); //this is just random

    // console.log(file);

    // cb(null, file.fieldname + "-" + uniqueSuffix); //so it depends which type of file name we want to give
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
