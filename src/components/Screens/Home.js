import React, { useEffect,useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer' 
import Card from '../Card'
export default function Home() { 
   
   const [foodCat,setFoodCat]=useState([]); 
   const [foodItem,setFoodItem]=useState([]);
  
   const loadData=async ()=>{ 
          
      let response=await fetch("http://localhost:5000/api/fooddata",{
         method:"POST",
         headers:{ 
          "Content-Type":"application/json"
         }
      });
     response=await response.json();  
     setFoodItem(response[0]); 
     setFoodCat(response[1]);
     //console.log(response[0],response[1]);
   } 

   useEffect(()=>{ 
      loadData()
   },[])
  return (
    <div> 
        <div><Navbar/></div> 
        <div className='container'> 

           { 
            foodCat!==[] 
            ? foodCat.map((data)=>{ 
               return (  
                <div className='row mb-3'> 
                 <div key={data._id} className='fs-3 m-3'>{data.
                  CategoryName
                  }</div> 
                  <hr/> 
                  { 
                 foodItem!==[]
                 ? 
                 foodItem.filter((item)=>item.CategoryName===data.CategoryName)
                  .map(filterItems=>{ 

                     return( 
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3"> 
                           <Card  
                           foodItem={filterItems}
                           options={filterItems.options[0]} 
                           
                           >
                           </Card>
                        </div>
                     )
                  }
                  
                  ):<div> NO such Data found</div>
                  }
                </div>
               ) 
      
            }):<div>""""""</div> 

            
         } 

        </div>
        <div><Footer/></div>
        
        

    </div> 

  )
}
