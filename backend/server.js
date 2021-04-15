const express=require("express");
const cors = require("cors");
const mongoose=require("mongoose");
const app=express();
const multer = require('multer');
const file = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './uploads');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});
const upload = multer({ storage: storage })


require("dotenv").config();





const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})
const connection=mongoose.connection;
connection.once('open',()=>{console.log('mongodb database established successfully')})



const carouselsRouter=require("./routes/home/carouselsHome");
const carouselsRoomRouter=require("./routes/room/carouselRoom");
const servicesRouter=require("./routes/home/services");
const featuredRoomsRouter=require("./routes/home/featuredRooms");
const searchRoomsRouter=require("./routes/room/searchRooms");
const usersRouter=require("./routes/users")

app.use("/carousels", carouselsRouter)
app.use("/carouselsRoom", carouselsRoomRouter)
app.use("/services", servicesRouter)
app.use("/featuredrooms", featuredRoomsRouter)
app.use("/searchrooms", searchRoomsRouter)
app.use("/users",usersRouter)



app.use(express.static("/home/ahlem/Bureau/RESSORT/build/"));
var publicDir = require('path').join(__dirname,'/uploads'); 
app.use(express.static(publicDir));
app.get('*',(req,res)=>{
  // res.sendFile(path.join(__dirname,'build','index.html'))
  res.sendFile(path.join("/home/ahlem/Bureau/RESSORT/build/",'index.html'))
});




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/carousel.js');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('file-to-upload'), (req, res) => {
  // console.log("rrr"+JSON.stringify(req.file.filename), req.body)
  
  // res.redirect('/');
});
app.listen(port,()=>{console.log(`app running on port: ${port}`);})