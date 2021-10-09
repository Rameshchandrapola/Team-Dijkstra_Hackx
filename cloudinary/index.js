const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key:`${process.env.CLOUDINARY_KEY}`,
    api_secret:`${process.env.CLOUDINARY_SECRET}`
});
 
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'badge',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}