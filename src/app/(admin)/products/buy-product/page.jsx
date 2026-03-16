import React from 'react'
import ProductList from '../../../../components/product/ProductList'

const Page = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        <ProductList />
      </div>
    </>
  )
}

export default Page