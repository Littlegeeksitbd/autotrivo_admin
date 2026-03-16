import React from 'react'

const Payment = () => {
  return (
    <div>
        <div className="mt-8 bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">💳 Payment Details</h2>
          <form className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg"
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-3 rounded-lg"
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
            />
            <button
              type="submit"
              className="col-span-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Pay ${total}
            </button>
          </form>
        </div>
    </div>
  )
}

export default Payment