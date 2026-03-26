
import Image from "next/image";

export const Disclaimer = () => {
  return (
    <div className="w-full bg-[#faf7f8] py-6">
      {/* Top Description */}
      <p className="text-center text-gray-700 text-base mb-4 px-2">
        The TrueK Inspection Report includes information gathered from the
        industry&aposs most known and trustworthy data providers and specialists.
      </p>

      {/* Logos Row */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-8">
        <Image
          src="/companies/1.png"
          alt="NMVTIS"
          className="h-16 object-contain"
          width={150}
          height={200}
        />
        <Image
          src="/companies/2.png"
          alt="Kelley Blue Book"
          className="h-16 object-contain"
          width={150}
          height={200}

        />
        <Image
          src="/companies/3.png"
          alt="J.D. Power"
          className="h-10 object-contain"
          width={150}
          height={200}

        />
        <Image
          src="/companies/4.png"
          alt="NADA"
          className="h-10 object-contain"
          width={150}
          height={200}

        />
      </div>

      {/* Disclaimer Section */}
      <div className="w-full bg-white bg-opacity-60 py-12 px-2 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-serif font-bold text-black mb-2">
          Disclaimer
        </h2>
        <div className="w-20 h-1 bg-red-600 rounded-full mb-6" />
        <p className="text-center text-lg font-semibold text-gray-900 max-w-4xl">
          Dear loyal Customers, We are approved licensed resellers of NMVTIS
          data supplier, and we solely employ SEO and Social Media Marketing to
          drive visitors to our website by delivering accurate and comprehensive
          information.
        </p>
      </div>
    </div>
  );
};
