import React from 'react';

const StatCard = ({ label, value }) => {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
};

const StatsSection = ({ totalCompanies, showingCount, currentPage, totalPages }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total Companies" value={totalCompanies} />
      <StatCard label="Showing" value={showingCount} />
      <StatCard label="Current Page" value={currentPage} />
      <StatCard label="Total Pages" value={totalPages || 1} />
    </section>
  );
};

export default StatsSection;