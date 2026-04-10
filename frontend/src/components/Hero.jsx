import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-sm">
      {/* Subtle glow overlays add depth without becoming flashy */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-28 w-28 rounded-full bg-indigo-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-3xl">
        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
          Production-ready directory
        </span>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
          Discover companies through an enterprise-grade interface.
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Browse, search, filter, sort, and paginate company records in a polished dashboard
          experience designed to feel like a real SaaS product.
        </p>
      </div>
    </section>
  );
};

export default Hero;