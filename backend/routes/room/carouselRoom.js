const router =require("express").Router();
let Carousel= require('../../models/room/carouselRoom.model');

router.route('/').get((req,res)=>{
    Carousel.find()
    .then(carousels=>res.json(carousels))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/add').post((req,res)=>{
    const image=req.body.image;
    const captionText=req.body.captionText;
    const captionHeader =req.body.captionHeader;
 

    const newCarousel=new Carousel({
        image,
        captionText,
        captionHeader,
       });

        newCarousel.save()
    .then(()=>res.json('Carousel.added!'))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/:id').get((req,res)=>{
  
    Carousel.findById(req.params.id)
    .then(carousel=>res.json(carousel))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/:id').delete((req,res)=>{
    Carousel.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Exercise.deleted!'))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/update/:id').post((req,res)=>{
    Carousel.findById(req.params.id)
    .then(carousel=>{
        carousel.image=req.body.image;
        carousel.captionText=req.body.captionText;
        carousel.captionHeader=req.body.captionHeader;
       
   
        carousel.save()
    .then(()=>res.json('Carousel.updated!'))
    .catch(err=>res.status(400).json('Error'+err));
})
    .catch(err=>res.status(400).json('Error:'+err))
});


module.exports=router;

// const router =require("express").Router();
// let Carousel= require('../../models/room/carouselRoom.model');

// router.route('/').get((req,res)=>{
//     Carousel.find()
//     .then(carousels=>res.json(carousels))
//     .catch(err=>res.status(400).json('Error:'+err))
// });

// router.route('/add').post((req,res)=>{
//     const image=req.body.image;
//     const captionText=req.body.captionText;
//     const captionHeader =req.body.captionHeader;
 

//     const newCarousel=new Carousel({
//         image,
//         captionText,
//         captionHeader,
//        });

//         newCarousel.save()
//     .then(()=>res.json('Carousel.added!'))
//     .catch(err=>res.status(400).json('Error'+err));
// });

// router.route('/:id').get((req,res)=>{
  
//     Carousel.findById(req.params.id)
//     .then(carousel=>res.json(carousel))
//     .catch(err=>res.status(400).json('Error:'+err))
// });

// router.route('/:id').delete((req,res)=>{
//     Carousel.findByIdAndDelete(req.params.id)
//     .then(()=>res.json('Exercise.deleted!'))
//     .catch(err=>res.status(400).json('Error:'+err));
// });

// router.route('/update/:id').post((req,res)=>{
//     Carousel.findById(req.params.id)
//     .then(carousel=>{
//         carousel.image=req.body.image;
//         carousel.captionText=req.body.captionText;
//         carousel.captionHeader=req.body.captionHeader;
       
   
//         carousel.save()
//     .then(()=>res.json('Carousel.updated!'))
//     .catch(err=>res.status(400).json('Error'+err));
// })
//     .catch(err=>res.status(400).json('Error:'+err))
// });


// module.exports=router;