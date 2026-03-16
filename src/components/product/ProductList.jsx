"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

const products = [
  { id: 1, name: "Wireless Headphone", price: 89, image: "https://via.placeholder.com/300" },
  { id: 2, name: "Smart Watch", price: 120, image: "https://via.placeholder.com/300" },
  { id: 3, name: "Bluetooth Speaker", price: 65, image: "https://via.placeholder.com/300" },
  { id: 4, name: "Gaming Mouse", price: 40, image: "https://via.placeholder.com/300" },
]

const ProductList = () => {

  const router = useRouter()

  const [selectedProducts, setSelectedProducts] = useState([])
  const [agree, setAgree] = useState(false)

  const toggleProduct = (product) => {

    const exists = selectedProducts.find(p => p.id === product.id)

    if (exists) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id))
    } else {
      setSelectedProducts([...selectedProducts, product])
    }

  }

  const removeProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id))
  }

  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0)

  const proceedToPayment = () => {

    const order = {
      items: selectedProducts,
      total: total
    }

    const encoded = encodeURIComponent(JSON.stringify(order))

    router.push(`/products/buy-product/payment?order=${encoded}`)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const selected = selectedProducts.some(p => p.id === product.id)
          return (
            <div
              key={product.id}
              onClick={() => toggleProduct(product)}
              className={`cursor-pointer bg-white rounded-xl shadow-md p-4 border-2
              ${selected ? "border-blue-500" : "border-transparent"}`}
            >

              <img
                src={product.image}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />

              <h2 className="text-lg font-semibold">{product.name}</h2>

              <div className="flex justify-between mt-2">
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>

                {selected && <span className="text-blue-600">✓</span>}
              </div>

            </div>
          )
        })}

      </div>

      {/* ORDER SUMMARY */}
      {selectedProducts.length > 0 && (

        <div className="mt-10 bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {selectedProducts.map(product => (

            <div key={product.id} className="flex justify-between border-b py-2">

              <span>{product.name}</span>

              <div className="flex gap-4 items-center">
                <span>${product.price}</span>

                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>

            </div>

          ))}

          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>

          {/* POLICY CHECKBOX */}
          <div className="mt-4 flex items-center gap-2">

            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />

            <span>
              I agree to the Terms & Policy
            </span>

          </div>

          {/* PROCEED BUTTON */}
          <button
            disabled={!agree}
            onClick={proceedToPayment}
            className={`mt-4 w-full py-3 rounded-lg text-black border border-amber-300 text-wrap
            ${agree ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"}`}
          >
            Proceed to Payment
          </button>

        </div>

      )}

    </div>
  )
}

export default ProductList