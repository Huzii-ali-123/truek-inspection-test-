import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
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
              <div className="bg-custom_red bg-opacity-10 p-5 rounded-full mb-5 border-2 border-custom_red border-opacity-20">
                <CheckCircle className="h-14 w-14 text-custom_red" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
                Payment Successful
              </h1>
              <div className="h-1 w-20 bg-custom_red rounded-full my-3"></div>
            </div>
          </div>

          <div className="bg-white py-12 px-8">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-gray-700 text-lg mb-6">
                Your payment has been processed successfully. Please check your
                email for the receipt and further instructions.
              </p>
              <p className="text-gray-700 text-base mb-6">
                If you don’t receive the email, please
                <a
                  href="mailto:contact@TrueKinspection.com"
                  className="text-custom_red"
                >
                  {" "}
                  contact our support team
                </a>
                .
              </p>
              <p className="text-gray-600 text-sm italic mb-6">
                If you notice any errors or have questions, email us at{" "}
                <a
                  href="mailto:contact@TrueKinspection.com"
                  className="text-custom_red underline"
                >
                  contact@TrueKinspection.com
                </a>{" "}
                and we’ll resolve them promptly. If we're unable to help and you
                want a refund then just contact us on{" "}
                <a
                  href="mailto:contact@TrueKinspection.com"
                  className="text-custom_red underline"
                >
                  contact@TrueKinspection.com
                </a>{" "}
                and we can issue you a refund in that case. Please avoid raising
                disputes directly
              </p>

              <div className="pt-2">
                <Link href="/">
                  <Button className="bg-custom_red hover:bg-red-700 text-white shadow-lg hover:shadow-xl px-10 py-6 rounded-md text-lg transition-all duration-300 transform hover:-translate-y-1">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer section with subtle design element */}
          <div className="bg-gray-50 py-6 px-8 border-t border-gray-100">
            <div className="flex justify-center items-center">
              <div className="text-gray-400 text-sm text-center">
                We appreciate your business.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
