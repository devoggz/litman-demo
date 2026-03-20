"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { formatPrice } from "@/utils/formatePrice";
import { useCart } from "@/hooks/useCart";

type PaymentMethod = "mpesa" | "card";

export default function CheckoutClient() {
  const { cartDetails, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mpesaPhone, setMpesaPhone] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const cartItems = Object.values(cartDetails ?? {});
  const shipping = 0;
  const total = totalPrice + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone)
      return toast.error("Please fill in all required fields");
    if (paymentMethod === "mpesa" && !mpesaPhone)
      return toast.error("Please enter your M-Pesa phone number");

    if (
      paymentMethod === "card" &&
      (!cardNumber || !cardName || !expiryDate || !cvv)
    )
      return toast.error("Please fill in all card details");

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order placed successfully!");
      clearCart();
      router.push("/");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">
            Your cart is empty
          </h2>
          <p className="text-dark-4 mb-6">
            Add some items to your cart to checkout
          </p>
          <button
            className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-dark transition"
            onClick={() => router.push("/shop-with-sidebar")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark mb-2">Checkout</h1>
            <p className="text-dark-4">Complete your order</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Contact */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-dark mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                <input
                  required
                  className="w-full px-4 py-3 border border-gray-3 rounded-lg"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  required
                  className="w-full px-4 py-3 border border-gray-3 rounded-lg"
                  placeholder="+254 700 000 000"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 pb-8 border-b border-gray-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-1">
                    <Image
                      fill
                      alt={item.name}
                      className="object-contain p-2"
                      src={item.image ?? "/images/placeholder.png"}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-dark">{item.name}</p>
                    <p className="text-sm text-dark-4">Qty: {item.quantity}</p>
                  </div>

                  <p className="font-semibold text-dark">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-dark mb-4">
                Payment Method
              </h2>

              {/* MPESA */}
              <button
                className={`w-full text-left mb-4 p-4 border-2 rounded-lg transition ${
                  paymentMethod === "mpesa"
                    ? "border-blue bg-blue/5"
                    : "border-gray-3 hover:border-gray-4"
                }`}
                type="button"
                onClick={() => setPaymentMethod("mpesa")}
              >
                <div className="flex items-center gap-3">
                  <input
                    readOnly
                    checked={paymentMethod === "mpesa"}
                    type="radio"
                  />
                  <Image
                    alt="M-Pesa"
                    height={40}
                    src="/images/payment/payment-06.svg"
                    width={40}
                  />
                </div>

                {paymentMethod === "mpesa" && (
                  <div className="mt-4">
                    <input
                      required
                      className="w-full px-4 py-3 border border-gray-3 rounded-lg"
                      placeholder="254 700 000 000"
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                    />
                  </div>
                )}
              </button>

              {/* CARD */}
              <button
                className={`w-full text-left p-4 border-2 rounded-lg transition ${
                  paymentMethod === "card"
                    ? "border-blue bg-blue/5"
                    : "border-gray-3 hover:border-gray-4"
                }`}
                type="button"
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex items-center gap-3">
                  <input
                    readOnly
                    checked={paymentMethod === "card"}
                    type="radio"
                  />
                  <span className="font-semibold">Credit/Debit Card</span>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-3">
                    <input
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <input
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="Cardholder Name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        required
                        className="w-full px-4 py-3 border rounded-lg"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                      <input
                        required
                        className="w-full px-4 py-3 border rounded-lg"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>

            <button
              className="w-full py-4 bg-blue text-white font-semibold rounded-lg disabled:opacity-50"
              disabled={isProcessing}
              type="submit"
            >
              {isProcessing
                ? "Processing..."
                : `Complete Order - ${formatPrice(total)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
