const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String
  });

  ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
  });
const opts = { toJSON: { virtuals: true } };
const badgeSchema = new Schema({
    institute :{
        type:String,
        required : true
    },
    name :{
        type : String,
        required :true
    },
    department:{
        type:String,
        required:true
    },
    duration :{
        type : String,
        required :true
    }
    ,
    image:{type:ImageSchema},
    signature :{type:ImageSchema },
    rollNumber :{
        type : String,
        required :true
    },
    address :{
        type: String,
        required:true
    },
    mobile: {
        type: Number,
        required:true
    },email: {
        type:String,
        required: true
    },
    qrcode : {
        type:String,
    }

},opts)

   
module.exports = mongoose.model('Badge',badgeSchema)