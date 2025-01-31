import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/recycle-bin.png'

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);

    const fetchInfo =async ()=>{
      await fetch('http://localhost:4000/allproducts')
      .then((res)=>res.json())
      .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
      fetchInfo();
    },[])

    const remove_product = async (id)=>{
      await fetch('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id})
      })
      await fetchInfo();
    }

  return (
    <div className='list-product'>
      <h1>All Events and Workshops</h1>
      <div className="listproduct-format-main">
        <p>Thumbnail</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>RStart</p>
        <p>Rend</p>
        <p>Start</p>
        <p>Duration</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img className='listproduct-product-icon' src={product.image} alt="" width={160} height={90} />
            <p>{product.name}</p>
            <p>Rs.{product.price}</p>
            <p>{product.category}</p>
            <p>{product.Rstart_date}</p>
            <p>{product.Rend_date}</p>
            <p>{product.start_date}</p>
            <p>{product.duration}</p>
            <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" width={50} height={50}  />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct