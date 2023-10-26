import React from 'react'
import "./index.css"
import shopper from "../../assets/shopper.png"
import seller from "../../assets/seller.png"
import { useNavigate } from 'react-router-dom'

const InstaMart = () => {
  const navigate  = useNavigate()

  return (
    <div className='insta-mart-page'>
        <div className='insta-mart-item shopper-section'>
            <img src={shopper} alt='shopper'/>
            <button className='insta-mart-button shopper-btn' onClick={()=>navigate("/auth",{state:{loginStatus:"shopper"}})}>Shoppers Login</button>
        </div>
        <div className='insta-mart-item seller-section'>
            <img src={seller} alt='shopper'/>
            <button className='insta-mart-button seller-btn' onClick={()=>navigate("/auth",{state:{loginStatus:"seller"}})}>Sellers Login</button>
        </div>
    </div>
  )
}

export default InstaMart