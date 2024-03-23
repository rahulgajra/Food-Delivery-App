const express=require('express'); 
const router=express.Router();  
const Order=require('../models/Orders') 

router.post('/orderData',async(req,res)=>{ 

   let data=req.body.Order_data 
   await data.splice(0,0,{Order_data:req.body.order_data}) 

   //if email dosent has in db 
   let eId=await Order.findOne({'email':req.body.email}) 
   console.log(eId) 
   if(eId===null) 
   { 
    try { 
        await Order.create({ 
            email:req.body.email,
            order_data:[data]
        }).then(()=>{ 
            res.json({success:true})
        })
        
    } catch (error) { 
        console.log(error.message) 
        res.send("server error",error.message)
        
    }
   } 
   else 
   { 
    try { 
        await Order.findOneAndUpdate({email:req.body.email}, 
         { $push:{order_data:data}}).then(()=>{ 
               res.json({success:true})
         })

         
        
    } catch (error) { 
        res.send("server error",error.message)
        
    }
   }



})  
router.post("/myorderData",async(req,res)=>{ 
    try {
     let myData=await Order.findOne({'email':req.body.email})
     res.json({orderData:myData})   
    } catch (error) {
        res.send("server error",error.message)
    }
})
module.exports=router;