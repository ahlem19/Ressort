const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const serviceSchema=new Schema({
    icon:{type:String,required:true},
    title:{type:String,required:true},
    text:{type:String,required:true},
  
},{
    timestamps:true,
});

const Service=mongoose.model('Service',serviceSchema);

module.exports= Service;

