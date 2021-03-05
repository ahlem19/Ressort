const router =require("express").Router();
let Service= require('../../models/home/service.model');

router.route('/').get((req,res)=>{
    Service.find()
    .then(services=>res.json(services))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/add').post((req,res)=>{
    const title=req.body.title;
    const text=req.body.text;
 

    const newService=new Service({
        title,
        text,
       });

        newService.save()
    .then(()=>res.json('Service.added!'))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/:id').get((req,res)=>{
  
    Service.findById(req.params.id)
    .then(service=>res.json(service))
    .catch(err=>res.status(400).json('Error:'+err))
});

router.route('/:id').delete((req,res)=>{
    Service.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Service.deleted!'))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/update/:id').post((req,res)=>{
    Service.findById(req.params.id)
    .then(service=>{
        service.title=req.body.title;
        service.text=req.body.text;
       
   
        service.save()
    .then(()=>res.json('Service.updated!'))
    .catch(err=>res.status(400).json('Error'+err));
})
    .catch(err=>res.status(400).json('Error:'+err))
});


module.exports=router;