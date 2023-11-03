import React ,{useState}from 'react'

import AdminMenu from "../../AdminMenu";
import { NavLink,Link } from 'react-router-dom'
import Layout from '../../../Components/Layout'
const ProductGrid = ({products}) => {
    
  return (


            <div class=" max-w-screen-2xl grid grid-cols-2 md:grid-cols-3 gap-4">


    {products.map((product)=>(
     <div class="relative overflow-hidden  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  {/* Ribbon */}

  <div class="absolute right-0 top-0 h-16 w-16">
    <div
      class="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
     {product?.category?.name}
    </div>
  </div>
     
     <a href={`/Dashboard/admin/product/${product.slug}`}>
       <img class="p-8 w-72 h-72 rounded-t-lg" src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`} alt="product image" />
     </a>

     <div class="px-5 pb-5 mb-4">
       <a href="#">
         <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
       </a>
       <div class="flex items-center mt-2.5 mb-5">
<span class="bg-blue-100 text-blue-800 text-xs font-bold mr-2 py-0.5 rounded dark:bg-blue-200 dark-text-blue-800 whitespace-wrap max-w-xs">{product.description}</span>



       </div>
       <div class="flex items-center justify-between">
         <span class="text-3xl font-bold text-gray-900 dark:text-white">{product.price}$</span>
         <a href="#" class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  <span className="mr-2 ">Shipping</span>
  {product?.shipping ? (
  <svg class="w-6 h-6  text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 21 21">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"/></svg>
  ) : (
    <svg class="w-3 h-3 ml-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
   
    </svg>
  )}
</a>
       </div>
     </div>
   </div>
   
    ))}
   
</div>



  )
}

export default ProductGrid;