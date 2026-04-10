import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 text-white backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.45)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-10 top-8 h-52 w-52 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
            Premium Recruiter-Focused UI
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Discover companies through a premium neo-glass experience.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            A futuristic and elegant company directory with refined search, smart filtering,
            smooth interactions, and standout presentation quality.
          </p>
        </div>

        <div className="grid w-full max-w-md grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Theme</p>
            <p className="mt-2 text-lg font-medium text-white">Neo Glass</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Style</p>
            <p className="mt-2 text-lg font-medium text-white">Premium Dark</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;