const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const searchRoomSchema=new Schema({
    image:{type:String,required:true},
    roomtype:{type:String,required:true},
    roomprice:{type:String,required:true},
    roomsize:{type:String,required:true},
    breakfast:{type:String,required:true},
    pets:{type:String,required:true},
  
},{
    timestamps:true,
});

const SearchRoom=mongoose.model('SearchRoom',searchRoomSchema);

module.exports= SearchRoom;

