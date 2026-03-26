"use client";

import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full mx-auto">
        {/* Gold decorative line at top */}
        <div className="h-1 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 rounded-full mb-1"></div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-10 px-8">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute inset-0 bg-[url('/images/luxury-pattern.png')] bg-repeat opacity-15"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-red-500 bg-opacity-10 p-5 rounded-full mb-5 border-2 border-red-500 border-opacity-20">
                <XCircle className="h-14 w-14 text-red-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
                Payment Cancelled
              </h1>
              <div className="h-1 w-20 bg-red-500 rounded-full my-3"></div>
            </div>
          </div>

          <div className="bg-white py-12 px-8">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-gray-700 text-lg mb-6">
                Your payment has been cancelled. No charges were made to your
                account.
              </p>

              <p className="text-gray-600 mb-10">
                If you encountered any issues or have questions, please
                don&apos;t hesitate to contact our support team.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                <Link href="/pricing">
                  <Button className="bg-custom_red hover:bg-red-700 text-white shadow-lg hover:shadow-xl px-8 py-6 rounded-md text-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
                    Return to Pricing
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 shadow-md hover:shadow-lg px-8 py-6 rounded-md text-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Go to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer section with subtle design element */}
          <div className="bg-gray-50 py-6 px-8 border-t border-gray-100">
            <div className="flex justify-center items-center">
              <div className="text-gray-400 text-sm text-center">
                Thank you for considering our services.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
