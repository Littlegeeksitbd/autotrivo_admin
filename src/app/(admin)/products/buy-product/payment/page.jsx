"use client"

import { useSearchParams } from "next/navigation"
import { useState } from 'react'
import Image from "next/image";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function PaymentPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [method, setMethod] = useState("")
  const [network, setNetwork] = useState("")
  const [copied, setCopied] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const receiverWallet = "TQ8ExampleWalletAddress123456"

  const params = useSearchParams()
  const orderParam = params.get("order")
  const order = orderParam ? JSON.parse(decodeURIComponent(orderParam)) : null

  const handleCopy = () => {
    navigator.clipboard.writeText(receiverWallet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerify = async () => {
    if (!txHash) {
      setMessage("Please enter transaction hash")
      return
    }
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`${API_URL}/api/payment/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionHash: txHash,
          network: network
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Payment verified! Status: ${data.status}`)
      } else {
        setMessage(`Error: ${data.message || "Verification failed"}`)
      }

    } catch (error) {
      setMessage(`Request failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (!order) return <p>No order found</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Make Payment</h1>
      {JSON.stringify(order)}

      {/* Order Details */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="font-bold mb-4">Order Details</h2>
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 font-bold">
          <span>Total</span>
          <span>${order.total}</span>
        </div>
      </div>

      {/* Payment Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6">Payment Method</h2>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Method</label>
          <select
            value={method}
            onChange={(e) => { setMethod(e.target.value); setNetwork("") }}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Payment Method</option>
            <option value="crypto">Crypto</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        {/* Crypto Network */}
        {method === "crypto" && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Select Network</label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Network</option>
              <option value="trc20">USDT TRC20</option>
              <option value="erc20">USDT ERC20</option>
              <option value="bep20">USDT BEP20</option>
            </select>
          </div>
        )}

        {/* TRC20 Payment Details */}
        {method === "crypto" && network === "trc20" && (
          <div className="mt-6 border-t pt-6">

            <h3 className="font-bold mb-4">Send USDT (TRC20)</h3>

            {/* Receiver Wallet */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Receiver Address</p>
              <span>{receiverWallet}</span>
              <button
                onClick={handleCopy}
                className="ml-2 text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-5 h-5 text-green-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-5 h-5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* QR Code */}
            <div className="mb-6 flex justify-center">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${receiverWallet}`}
                width={200}
                height={200}
                alt="wallet qr"
              />
            </div>

            {/* Sender Transaction Hash */}
            <div className="mb-4">
              <label className="block mb-1">Sender Transaction Hash</label>
              <input
                type="text"
                placeholder="Enter transaction hash"
                className="w-full border p-3 rounded"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
              />
            </div>

            {/* Verify Button */}
            <div className="flex flex-end">
              <button
                type="button"
                className="btn bg-primary hover:bg-primary-hover text-white"
                onClick={handleVerify}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Payment"}
              </button>
            </div>

            {/* Status Message */}
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}

          </div>
        )}
      </div>
    </div>
  )
}