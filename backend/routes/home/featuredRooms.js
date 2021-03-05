const router =require("express").Router();
let FeaturedRoom= require('../../models/home/featuredRoom.model');

router.route('/').get((req,res)=>{
    FeaturedRoom.find()
    .then(featuredrooms=>res.json(featuredrooms))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/add').post((req,res)=>{
    
    const image=req.body.image;
    const text=req.body.text;
  console.log(image+""+text)

    const newFeaturedRooms=new FeaturedRoom({
        image,
        text,
       });

       newFeaturedRooms.save()
    .then(()=>res.json('FeaturedRooms.added!'))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/:id').get((req,res)=>{
  
    FeaturedRoom.findById(req.params.id)
    .then(featuredroom=>res.json(featuredroom))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/:id').delete((req,res)=>{
    FeaturedRoom.findByIdAndDelete(req.params.id)
    .then(()=>res.json('FeaturedRoom.deleted!'))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/update/:id').post((req,res)=>{
    FeaturedRoom.findById(req.params.id)
    .then(featuredroom=>{
        featuredroom.image=req.body.image;
        featuredroom.text=req.body.text;
       
   
        featuredroom.save()
    .then(()=>res.json('Featuredroom.updated!'))
    .catch(err=>res.status(400).json('Error'+err));
})
    .catch(err=>res.status(400).json('Error:'+err))
});


module.exports=router;