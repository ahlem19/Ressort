const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const featuredRoomSchema=new Schema({
    image:{type:String,required:true},
    type:{type:String,required:true},
    details:{type:String,required:true},
    price:{type:String,required:true},
    nbrRoom:{type:String,required:true},
    maxcapacity:{type:String,required:true},
    pets:{type:String,required:true},
    freebreakfast:{type:String,required:true},
   
  
},{
    timestamps:true,
});

const FeaturedRoom=mongoose.model('FeaturedRoom',featuredRoomSchema);

module.exports= FeaturedRoom;

