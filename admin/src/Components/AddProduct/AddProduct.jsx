import React, {useState} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.png'


const Addproduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
      name:"",
      image:"",
      category:"event",
      price:"",
      description:"",
      Rstart_date:"",
      Rend_date:"",
      start_date:"",
      duration:"",
    })

    const imageHeader = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) =>{
      setProductDetails({...productDetails,[e.target.name]:e.target.value});
    };

    const Add_Product = async ()=>{
      console.log(productDetails);
      let responseData;
      let product = productDetails;

      let formData = new FormData();
      formData.append('product',image);

      await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:{
          Accept:'application/json',
        },
        body:formData,
      }).then((resp) => resp.json()).then((data)=>{responseData=data});
      
      if(responseData.success)
      {
        product.image = responseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
          data.success?alert("Product Added"):alert("Failed")
        })
      }
    };


  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Name</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.price} onChange={changeHandler} type="number" name="price" placeholder='Type here'/>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Type</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="event">Event</option>
          <option value="workshop">Workshop</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input" >
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-image' alt="" />
        </label>
        <input onChange={imageHeader} type="file" name='image' id='file-input' hidden />
      </div>
      <div className="addproduct-itemfield">
        <p>Enter Description</p>
        <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type here'/>
      </div>
      <div className="addproduct-startend">
        <div className="addproduct-itemfield">
          <p>Registration Date Start</p>
          <input value={productDetails.Rstart_date} onChange={changeHandler} type="date" name='Rstart_date' />
        </div>
        <div className="addproduct-itemfield">
          <p>Registration Date End</p>
          <input value={productDetails.Rend_date} onChange={changeHandler} type="date" name='Rend_date' />
        </div>
      </div>
      <div className="addproduct-duration">
        <div className="addproduct-itemfield">
        <p>Date</p>
        <input value={productDetails.start_date} onChange={changeHandler} type="date" name='start_date' />
      </div>
      <div className="addproduct-itemfield">
        <p>Duration</p>
        <input value={productDetails.duration} onChange={changeHandler} type="text" name='duration' placeholder='Type here'/>
        </div>
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default Addproduct