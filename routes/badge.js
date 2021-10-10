const express = require('express');
const router = express.Router();
const Badge = require('../models/badge')
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload =  multer({ storage });
const { cloudinary } = require("../cloudinary");

router.get('/getbadgeadmin',(req,res)=>{
    res.redirect('/badge/admin')
})
router.post('/getbadgeadmin',async(req,res)=>{
    try{
        if(!req.body){
            res.send('You are unAuthorized for this page')
        }
        if(req.body.username=='secretadmin' && req.body.password=='admin@2021'){
            const badges = await Badge.find({});
            res.render('badge/index',{badges}) 
        }else{
            res.send('Username or Password is Incorrect !!!')
        }
       
    }catch(e){
        res.send(e)
     }
   
})
router.get('/user',(req,res)=>{
    res.render('getBadge/forstudent')
})
router.get('/admin',(req,res)=>{
    res.render('getBadge/forAdmin')
})
router.post('/getbadge',async(req,res)=>{
    try{
        const badge = await Badge.findOne({rollNumber:req.body.rollNumber,mobile:req.body.mobile});
        if(!badge){
            res.send("Roll Number or mobile Number is Incorrect !!!")
        }
        res.redirect(`/badge/${badge._id}`)

    }catch(e){
        res.send(e)
     }
   
})

router.get('/new',async(req,res)=>{
    try{
        const {institute} = req.query;
        res.render('badge/new',{institute})
    }catch(e){
        res.send(e)
     }
  
})
router.post('/',upload.array('images'),async(req,res)=>{
    try{  
    const badge = await new Badge({
        institute : req.body.institute ,
        name :req.body.name ,
        duration : req.body.duration,
        department : req.body.department,
        rollNumber :req.body.rollNumber ,
        address :req.body.address ,
        mobile :req.body.mobile ,
        email : req.body.email,
        qrcode : `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${req.body.rollNumber}`
    })
    
    if(req.files){
        badge.signature = {
           url:req.files[1].path,
           filename:req.files[1].filename
        }
       badge.image = {
            url:req.files[0].path,
            filename:req.files[0].filename
        }}
    
    await badge.save()
    res.redirect(`/badge/${badge._id}`);    
    }catch(e){
        res.send(e)
     }
})

router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const badge = await Badge.findById(id);
        res.render('badge/card',{badge})
    }catch(e){
        res.send(e)
     }

})
router.get('/edit/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const badge = await Badge.findById(id);
        res.render('badge/edit',{badge})
    }catch(e){
        res.send(e)
     }
   
})
router.put('/edit/:id',upload.array('images'),async(req,res)=>{
    try{ 
        const {id}= req.params;
        const badge = await Badge.findByIdAndUpdate(id,{
            institute : req.body.institute ,
        name :req.body.name ,
        duration : req.body.duration,
        department : req.body.department,
        rollNumber :req.body.rollNumber ,
        address :req.body.address ,
        mobile :req.body.mobile ,
        email : req.body.email,
        qrcode : `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${req.body.rollNumber}`
        })
        if(req.files.length !=0){
        
            await cloudinary.uploader.destroy(badge.signature);
            await cloudinary.uploader.destroy(badge.image);
           
          
            badge.signature = {
             url:req.files[1].path,
             filename:req.files[1].filename
         }
            badge.image = {
              url:req.files[0].path,
              filename:req.files[0].filename
          }}
       await badge.save()
       res.redirect(`/badge/${id}`);
    }
    catch(e){
        res.send(e)
     }
    
})

router.delete('/delete/:id/',async(req,res)=>{
    try{
        const {id}= req.params;
        await Badge.findByIdAndDelete(id);
          res.redirect(`/`)
    }catch(e){
        res.send(e)
     }

})
module.exports = router;