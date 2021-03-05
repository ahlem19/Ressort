const express=require("express");
const cors = require("cors");
const mongoose=require("mongoose");


require("dotenv").config();

const app=express();



const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})
const connection=mongoose.connection;
connection.once('open',()=>{console.log('mongodb database established successfully')})



const carouselsRouter=require("./routes/room/carouselRoom");
const carouselsRoomRouter=require("./routes/home/carouselsHome");
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



app.listen(port,()=>{console.log(`app running on port: ${port}`);})