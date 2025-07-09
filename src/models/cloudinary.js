
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: 'process.env.CLOUDNARY_CLOUD_NAME',
    api_key: 'process.env.CLOUDNARY_API_KEY',
    api_secret: 'process.env.CLOUDNARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
});


//File uploading 
const uploadCloundinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file in cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        // file has been uploaded
        console.log("File is uploaded on Cloudinary",response.url);
        return response;
    } // if file not uploaded then remove the local file 
    catch (error){
        fs.unlinkSync(localFilePath); // remove the local temporay file
        return null;

    }
}

export {uploadCloundinary};


// cloudinary.v2.uploader.upload("https://res.cloudinary.com/dkz9xk60z/image/upload/v1688388324/380945599_1688388324.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) {
//         console.log(result);
//     });