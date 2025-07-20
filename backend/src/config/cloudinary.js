import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

//taking the files to the server and then uploading it to cloudinary and after that delete that file from the server which is uploaded

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//now this fnction is to take that file path and then upload in cloudinary and then unlink or remove from the server too
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null; //or we can send an error message, if there is not localFilePath
    }

    //upload the file on cloudinary, we can give more thing to the upload like public id or name check documentation
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been uploaded successfully
    // console.log("File is uploaded");
    // console.log(response); //so here we will get many value and from that we want url

    //after uploading unlink
    fs.unlinkSync(localFilePath); //so if we upload the file it is a very fast process so when the image will be using multer in public/temp ,when this cloudinary function is called it will unlink its self very fast after uploading into cloudinary
    return response;
  } catch (error) {
    //if file is not uploaded successfully
    //as that file might be in our server so we need to remove that
    fs.unlinkSync(localFilePath); //remove the local save temp file as upload operation failed
    return null;
  }
};

export default uploadOnCloudinary;
