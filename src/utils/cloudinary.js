import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

// (async function () {

//     // Configuration
//     cloudinary.config({
//         cloud_name: process.env.CLOOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOOUDINARY_API_KEY,
//         api_secret: process.env.CLOOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });

//     // Upload an image
//     const uploadResult = await cloudinary.uploader
//         .upload(
//             'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//             public_id: 'shoes',
//         }
//         )
//         .catch((error) => {
//             console.log(error);
//         });

//     console.log(uploadResult);

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOOUDINARY_API_KEY,
    api_secret: process.env.CLOOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on the cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been uploaded successfull
        // console.log("file has been uploaded successfully!");
        fs.unlinkSync(localFilePath) // unlink the locally save temporary saved file
        return response;
    } catch (error) {
        console.log("file has been not uploaded successfully!",error);
        fs.unlinkSync(localFilePath) // unlink the locally save temporary saved file
        return null;
    }
}

export {uploadOnCloudinary}