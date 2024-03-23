const mongoose=require('mongoose'); 
// user have first provide the link of their database of mongoDB atlas in mongouri 
const mongouri='';      
 const mongoDB=async ()=>{ 
    
     await mongoose.connect(mongouri,{useNewUrlParser:true},async(err,result)=>{ 
        
        if(err) 
        { 
            console.log('--',err);
        } 
        else 
        { 
            //console.log('connected'); 
            // if we want to read the data from our data base;; 
            const fatch_data=await mongoose.connection.db.collection("food_items"); 
            fatch_data.find({}).toArray(async function(err,data)
            {  
                const foodCategory=await mongoose.connection.db.collection("foodcatogiry");  
                foodCategory.find({}).toArray(function (err,catData){ 
                    
                      
                 if(err)
                 { 
                     console.log('--',err);
                 } 
                 else{ 
                    
                     global.food_items=data;  
                     global.foodCategory=catData;
                    console.log("connected");
                 }


                })
               
            });
        }
            
     }) 
   
     
} 
module.exports=mongoDB;


