const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const featuredRoomSchema=new Schema({
    image:{type:String,required:true},
    text:{type:String,required:true},
  
},{
    timestamps:true,
});

const FeaturedRoom=mongoose.model('FeaturedRoom',featuredRoomSchema);

module.exports= FeaturedRoom;

