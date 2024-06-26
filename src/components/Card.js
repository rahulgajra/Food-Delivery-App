import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import { findAllByAltText } from '@testing-library/react';
export default function card(props) { 
  
  let dispatch = useDispatchCart();
  let data=useCart(); 
  let PriceRef=useRef();
  let options=props.options; 
  let priceOptions=Object.keys(options);   
  let foodItem=props.foodItems;
  const [qty,setQty]=useState(1) 
  const [size,setSize]=useState("")
 const handleAddToCart= async() =>{  
    let food=[] 
    for(const item of data) 
    { 
      if(item.id === props.foodItem._id) 
      { 
        food=item;
        break;
      }
    }
    if(food!=[]) 
    { 
      if(food.size === size) 
      { 
      await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty}) 
      return 
      }
     
    else if(food.size!=size) 
    { 
      await dispatch({type:"ADD",id: props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})  
      return;
    } 
    return 
  }

    await dispatch({type:"ADD",id: props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size}) 

 } 
 let finalPrice=qty*parseInt(options[size]); 
 useEffect(()=>{ 
      setSize(PriceRef.current.value)
 },[])
  return (
    <div> 
    <div className="card" style={{"width":"18rem","maxHeight":"50vh","marginBottom":"2vh"}}>
<img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"22vh",objectFit:"fill"}}/>
<div className="card-body">
<h5 className="card-title">{props.foodItem.name}</h5>
<p className="card-text"></p> 
<div className="container w-100"> 
    <select className='m-2 h-100  bg-success rounded' onChange={(e)=>setQty(e.target.value)}> 
    { 
        Array.from(Array(6),(e,i)=>{ 
          return( 
             <option key={i+1} value={i+1}> {i+1} </option>
          )
        }) 
       
    } 
    </select>
    <select className='m-2 h-100 bg-success rounded' ref={PriceRef} onChange={(e)=>setSize(e.target.value)}> 
         { 
         priceOptions.map((data)=>{ 
           return <option key={data} value={data}>{data}</option>
         })}
       </select> 
        <div className='d-inline h-100 fs-5'> 
        ₹{finalPrice}/-
        </div>
  
      <hr> 
      </hr> 
      <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button> 
      </div>
</div>
</div>
</div> 
  )
}
