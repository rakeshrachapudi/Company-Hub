import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-indigo-300/30 hover:shadow-[0_20px_40px_rgba(79,70,229,0.16)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-400/10 blur-2xl" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-medium text-white">{company.name}</h3>
          <p className="mt-1 text-sm text-slate-300">Company ID: {company.id}</p>
        </div>

        <span className="shrink-0 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
          {company.industry}
        </span>
      </div>

      <div className="relative mt-6 space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Location</p>
          <p className="mt-2 text-sm text-white">{company.location}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Industry</p>
          <p className="mt-2 text-sm text-white">{company.industry}</p>
        </div>
      </div>
    </article>
  );
};

export default CompanyCard;