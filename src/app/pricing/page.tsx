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
    initializePaddle({ 
      environment: "production", 
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "",
      eventCallback: async (event: any) => {
        if (event.name === "checkout.completed") {
          const customerInfo = event.data.customer || {};
          const checkoutDetails = event.data.details?.totals || {};
          
          // 👇 FIX: Pull the saved Name and VIN from the Homepage Form
          const storedVin = localStorage.getItem("temp_vin") || "N/A";
          const storedName = localStorage.getItem("temp_name") || customerInfo.name || "Customer";

          console.log("Payment Success! Data found:", { storedName, storedVin });

          await sendPaymentSuccessEmails({
            email: customerInfo.email || "No Email Provided",
            name: storedName, // Now passing the actual name
            vin: storedVin,   // Now passing the actual VIN
            orderId: event.data.id || "N/A",
            amount: checkoutDetails.total ? (parseInt(checkoutDetails.total) / 100).toFixed(2) : "49.00"
          });

          window.location.href = "/payment-success";
        }
      }
    }).then((paddleInstance) => {
      if (paddleInstance) setPaddle(paddleInstance);
    });

    const savedVin = localStorage.getItem("temp_vin");
    if (savedVin) setVin(savedVin);
  }, []);

  const handleCheckout = (priceId: string) => {
    if (!paddle) {
      console.error("Paddle not initialized");
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customData: { vin_number: vin },
    });
  };

  return (
    <main className="max-w-[1920px] mx-auto relative overflow-hidden">
      <Navbar />
      <div className="mt-10 max-w-6xl mx-auto px-4 py-10">
        <div className="py-16 px-4">
          <div className="container mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Complete Your Booking</h2>
              <p className="text-gray-600">
                Confirm your plan below for VIN:{" "}
                <span className="font-bold text-custom_red">{vin || "Loading..."}</span>
              </p>
          </div>

          <div className="grid max-w-xl mx-auto">
            {pricing.map((plan) => (
              <div key={plan.id} className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="absolute inset-x-0 top-0 h-2 bg-custom_red rounded-t-2xl" />
                <h3 className="text-custom_red text-xl font-semibold mb-1">{plan.plan}</h3>
                <div className="mb-8">
                  <p className="text-4xl font-bold text-custom_red">{plan.displayPrice}</p>
                </div>

                <div className="space-y-4 mb-8 text-left">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <span className="text-custom_red mr-2">✔️</span>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                    className="w-full bg-custom_red hover:hover:bg-[#70c1e3]"
                    onClick={() => handleCheckout(plan.priceId)}
                >
                  Buy Now
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