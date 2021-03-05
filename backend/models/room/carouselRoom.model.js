const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const carouselSchema=new Schema({
    image:{type:String,required:true},
    captionText:{type:String,required:true},
    captionHeader:{type:String,required:true},
  
},{
    timestamps:true,
});

const Carousel=mongoose.model('CarouselRoom',carouselSchema);

module.exports=Carousel;

