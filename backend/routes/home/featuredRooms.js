const router =require("express").Router();
let FeaturedRoom= require('../../models/home/featuredRoom.model');

router.route('/').get((req,res)=>{
    FeaturedRoom.find()
    .then(featuredrooms=>res.json(featuredrooms))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/add').post((req,res)=>{
    
    const image=req.body.image;
    const type=req.body.type;
    const details=req.body.details;
    const price=req.body.price;
    const nbrRoom=req.body.nbrRoom;
    const maxcapacity=req.body.maxcapacity;
    const pets=req.body.pets;
    const freebreakfast=req.body.freebreakfast;


    const newFeaturedRooms=new FeaturedRoom({
        image,
        type,
        details,
        price,
        nbrRoom,
        maxcapacity,
        pets,
        freebreakfast
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
        featuredroom.type=req.body.type;
        featuredroom.details=req.body.details;
        featuredroom.price=req.body.price;
        featuredroom.nbrRoom=req.body.nbrRoom;
        featuredroom.maxcapacity=req.body.maxcapacity;
        featuredroom.pets=req.body.pets;
        featuredroom.freebreakfast=req.body.freebreakfast;
       
   
        featuredroom.save()
    .then(()=>res.json('Featuredroom.updated!'))
    .catch(err=>res.status(400).json('Error'+err));
})
    .catch(err=>res.status(400).json('Error:'+err))
});


module.exports=router;