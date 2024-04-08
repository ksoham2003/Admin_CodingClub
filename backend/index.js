const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const {cloudinaryConnect} = require("./config/cloudinary");
const {uploadImageToCloudinary} = require("./utils/imageUploader");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://ksoham242003:2003_soham@cluster0.x51dxp8.mongodb.net/Coding_Club");
cloudinaryConnect();

// API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

// app.post('/upload',upload.single('product'),(req,res)=>{
//     res.json({
//         success:1,
//         image_url: `http://localhost:${port}/images/${req.file.filename}`
//     })
// })

app.post('/upload', async (req,res)=>{
    
    const thumbnail = req.files;
    console.log("Image:", thumbnail);
    // const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
    res.json({
        success:1,
        // image_url: thumbnailImage.secure_url
    })
})

//Schema for Creation Products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{ 
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    Rstart_date:{
        type:Date,
        required:true,
    },
    Rend_date:{
        type:Date,
        required:true,
    },
    start_date:{
        type:Date,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        description:req.body.description,
        Rstart_date:req.body.Rstart_date,
        Rend_date:req.body.Rend_date,
        start_date:req.body.start_date,
        price:req.body.price,
        duration:req.body.duration,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating API For deleting Product

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Remove");
    res.json({
        success:true,
        name:req.body.name
    })
})

// Creating API for getting all products
app.get('/allproducts',async (req,res)=>{
    let products =await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Shema creating for User model
const User = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now(),
    }
})

// Creating Endpoint for registring the user
app.post('/signup',async (req,res)=>{

    let check= await User.findOne({email:request.body.email})
    if(check){
        return res.status(400).json({success:false,error:"existing user found with same email address"})
    }
    let cart = {};
    for (let i = 0; i<300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({success:true,token})
})


app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port)
    }
    else
    {
        console.log("Error : "+error)
    }
})




