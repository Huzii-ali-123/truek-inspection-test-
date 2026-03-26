"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { FooterSection } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { sendPaymentSuccessEmails } from "@/actions/success";

const pricing = [
  {
    id: "10201",
    plan: "Our Plan",
    displayPrice: "$49",
    // CRITICAL: Verify this is a LIVE price ID from the dashboard
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || "pri_01kmj8139rhqsreprqqjds5zcd", 
    features: [
      "1 Vehicle Report",
      "Vehicle Specification",
      "DMV Title History",
      "Safety Recall Status",
      "Online Listing History",
      "Junk & Salvage Information",
      "Accident Information",
    ],
  },
];

export default function PricingPage() {
  const [vin, setVin] = useState("");
  const [paddle, setPaddle] = useState<Paddle | undefined>();

  useEffect(() => {
    const init = async () => {
      try {
        const paddleInstance = await initializePaddle({ 
          environment: "production", // Must be production for live tokens
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "",
          eventCallback: async (event: any) => {
            console.log("Paddle Event:", event.name, event.data); // Debug logging

            if (event.name === "checkout.completed") {
              const customerInfo = event.data.customer || {};
              const checkoutDetails = event.data.details?.totals || {};
              
              const storedVin = localStorage.getItem("temp_vin") || "N/A";
              const storedName = localStorage.getItem("temp_name") || customerInfo.name || "Customer";

              await sendPaymentSuccessEmails({
                email: customerInfo.email || "No Email Provided",
                name: storedName,
                vin: storedVin,
                orderId: event.data.id || "N/A",
                amount: checkoutDetails.total ? (Number(checkoutDetails.total) / 100).toFixed(2) : "49.00"
              });
              window.location.href = "/payment-success";
            }

            // Capture specific frontend errors from Paddle
            if (event.name === "checkout.error") {
              console.error("Paddle Checkout Error:", event.data);
            }
          }
        });

        if (paddleInstance) setPaddle(paddleInstance);
      } catch (e) {
        console.error("Failed to init Paddle:", e);
      }
    };

    init();
    setVin(localStorage.getItem("temp_vin") || "");
  }, []);

  const handleCheckout = (priceId: string) => {
    if (!paddle) {
      alert("Payment system is still loading. Please wait a second.");
      return;
    }

    paddle.Checkout.open({
      settings: {
        displayMode: "overlay",
        theme: "light",
      },
      items: [{ priceId: priceId, quantity: 1 }],
      // Use a simple key for customData to avoid schema issues
      customData: { 
        vin: vin || "not_provided" 
      },
    });
  };

  return (
    <main className="max-w-[1920px] mx-auto relative overflow-hidden">
      <Navbar />
      <div className="mt-10 max-w-6xl mx-auto px-4 py-10">
        <div className="py-16 px-4">
          <div className="container mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Complete Your Booking</h2>
              <p className="text-gray-600 text-lg">
                Confirm your plan below for VIN:{" "}
                <span className="font-bold text-custom_red uppercase">{vin || "Loading..."}</span>
              </p>
          </div>

          <div className="grid max-w-xl mx-auto">
            {pricing.map((plan) => (
              <div key={plan.id} className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
                <div className="absolute inset-x-0 top-0 h-2 bg-custom_red rounded-t-2xl" />
                <h3 className="text-custom_red text-2xl font-bold mb-2">{plan.plan}</h3>
                <div className="mb-8">
                  <p className="text-5xl font-extrabold text-custom_red">{plan.displayPrice}</p>
                </div>

                <div className="space-y-4 mb-10 text-left">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                    className="w-full py-6 text-lg font-bold bg-custom_red hover:bg-[#b02222] text-white shadow-lg transition-all"
                    onClick={() => handleCheckout(plan.priceId)}
                >
                  Confirm & Pay Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}