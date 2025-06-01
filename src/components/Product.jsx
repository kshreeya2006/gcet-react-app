import React, { useContext } from 'react'
import { AppContext } from '../App'
import './Product.css'

export default function Product() {
  const { user } = useContext(AppContext)
  return (
    <div className="product-container">
      <h3>Welcome {user.name}!</h3>
      Product List
    </div>
  )
}
