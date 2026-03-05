import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#e8d7b0]">

      {/* Silk Gold Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6e3] via-[#f1d27a] to-[#c89b2c]" />

      {/* Soft Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_40%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 items-center gap-10 px-6 sm:px-10 lg:px-16 py-16 lg:py-24">

        {/* Left */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1e2a38] leading-tight">
            Divine Fashion for{" "}
            <span className="text-[#b8860b]">Kanha Ji & You</span>
          </h1>

          <p className="mt-6 max-w-xl mx-auto md:mx-0 text-[#1e2a38]/80">
            Explore exquisite, handcrafted attire made with devotion,
            elegance, and superior craftsmanship.
          </p>

          <div className="mt-8">
            <Link
              to="/kanha-ji-dress"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex justify-center mt-10 md:mt-0 group">
          <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] bg-yellow-300/20 rounded-full blur-3xl transition duration-500 group-hover:scale-110"></div>

          <img
            src="/assets/girl.jpg"
            alt="Divine Fashion Girl"
            className="relative w-72 sm:w-80 md:w-[500px] object-contain drop-shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:scale-105"
          />
        </div>

      </div>
    </div>
  );
}