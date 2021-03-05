const router =require("express").Router();
let SearchRoom= require('../../models/room/searchRoom.model');

router.route('/').get((req,res)=>{
    SearchRoom.find()
    .then(searchrooms=>res.json(searchrooms))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/add').post((req,res)=>{
    
    const image=req.body.image;
    const roomtype=req.body.roomtype;
    const roomprice=req.body.roomprice;
    const roomsize=req.body.roomsize;
    const breakfast=req.body.breakfast;
    const pets=req.body.pets;
  console.log(image+""+roomtype)

    const newSearchRooms=new SearchRoom({
        image,
        roomtype,
        roomprice,
        roomsize,
        breakfast,
        pets
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
        searchroom.roomtype=req.body.roomtype;
        searchroom.roomprice=req.body.roomprice;
        searchroom.roomsize=req.body.roomsize;
        searchroom.breakfast=req.body.breakfast;
        searchroom.pets=req.body.pets;
       
   
        searchroom.save()
    .then(()=>res.json('Searchroom.updated!'))
    .catch(err=>res.status(400).json('Error'+err));
})
    .catch(err=>res.status(400).json('Error:'+err))
});


module.exports=router;