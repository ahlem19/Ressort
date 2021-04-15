const router =require("express").Router();
let SearchRoom= require('../../models/room/searchRoom.model');

router.route('/').get((req,res)=>{
    SearchRoom.find()
    .then(searchrooms=>res.json(searchrooms))
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


    const newSearchRooms=new SearchRoom({
        image,
        type,
        details,
        price,
        nbrRoom,
        maxcapacity,
        pets,
        freebreakfast
       });

       newSearchRooms.save()
    .then(()=>res.json('SearchRooms.added!'))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/:id').get((req,res)=>{
  
    SearchRoom.findById(req.params.id)
    .then(searchroom=>res.json(searchroom))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/:id').delete((req,res)=>{
    SearchRoom.findByIdAndDelete(req.params.id)
    .then(()=>res.json('SearchRoom.deleted!'))
    .catch(err=>res.status(400).json('Error:'+err));
});


router.route('/update/:id').post((req,res)=>{
    SearchRoom.findById(req.params.id)
    .then(searchroom=>{
        searchroom.image=req.body.image;
        searchroom.type=req.body.type;
        searchroom.details=req.body.details;
        searchroom.price=req.body.price;
        searchroom.nbrRoom=req.body.nbrRoom;
        searchroom.maxcapacity=req.body.maxcapacity;
        searchroom.pets=req.body.pets;
        searchroom.freebreakfast=req.body.freebreakfast;
       
   
        searchroom.save()
    .then(()=>res.json('Searchroom.updated!'))
    .catch(err=>res.status(400).json('Error'+err));
})
    .catch(err=>res.status(400).json('Error:'+err))
});


module.exports=router;