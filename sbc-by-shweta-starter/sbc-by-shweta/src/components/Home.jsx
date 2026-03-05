import Hero from "../components/Hero";
import FeatureBar from "../components/FeatureBar";
import ProductGrid from "../components/ProductGrid";
import products from "../data/products";

export default function Home() {
  const kanha = products.filter((p) => p.category === "kanha-ji-dress");
  const sarees = products.filter((p) => p.category === "sarees");

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#fdfaf6] via-[#f5e6c8] to-white">

      {/* Decorative Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="luxuryPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#c6a75e" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#luxuryPattern)" />
        </svg>
      </div>

      <div className="relative z-10">

        {/* HERO */}
        <section className="px-4 sm:px-6 lg:px-12 pt-20 pb-24">
          <Hero />
        </section>

        {/* FEATURE */}
        <section className="px-4 sm:px-6 lg:px-12 py-24">
          <FeatureBar />
        </section>

        {/* KANHA PRODUCTS */}
        <section className="px-4 sm:px-6 lg:px-12 py-24">
          <SectionTitle title="Divine Kanha Ji Dresses" />
          <ProductGrid products={kanha.slice(0, 4)} />
        </section>

        {/* SAREES */}
        <section className="px-4 sm:px-6 lg:px-12 pb-32 pt-24">
          <SectionTitle title="Exquisite Sarees Collection" />
          <ProductGrid products={sarees.slice(0, 4)} />
        </section>

      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="flex flex-col items-center mb-14 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#1e2a38] tracking-wide">
        {title}
      </h2>
      <div className="h-[2px] w-28 bg-gradient-to-r from-[#c6a75e] via-[#e6c56e] to-[#c6a75e] mt-4 rounded-full"></div>
    </div>
  );
}