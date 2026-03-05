import { Gem, Sparkles, Truck } from "lucide-react";

const feats = [
  {
    title: "Premium Quality",
    desc: "Crafted using the finest fabrics with attention to detail and elegance.",
    icon: Gem,
  },
  {
    title: "Handcrafted",
    desc: "Every piece is thoughtfully handmade with devotion and precision.",
    icon: Sparkles,
  },
  {
    title: "Trusted Delivery",
    desc: "Secure packaging and reliable delivery for a seamless experience.",
    icon: Truck,
  },
];

export default function FeatureBar() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* About */}
      <div className="mt-[35px] text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-semibold mb-6"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          About SBC by Shwetaa
        </h2>
        <div className="flex justify-center mb-8">
          <div className="w-28 h-[2px] bg-gradient-to-r from-[#d4af37] via-[#f6e27a] to-[#d4af37] rounded-full"></div>
        </div>

        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg">
          SBC by Shwetaa represents timeless elegance, luxury styling, and
          refined aesthetics. Every detail is crafted with precision.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {feats.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-md border border-[#e8d7b0] overflow-hidden transition duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f6e27a]/0 via-[#e6c56e]/0 to-[#c89b2c]/0 group-hover:from-[#f6e27a]/10 group-hover:via-[#e6c56e]/10 group-hover:to-[#c89b2c]/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-[#e6c56e] to-[#c89b2c] flex items-center justify-center shadow">
                  <Icon size={24} strokeWidth={1.5} className="text-white" />
                </div>

                <h3 className="mt-6 font-semibold text-lg text-[#1c1c1c]">
                  {f.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
