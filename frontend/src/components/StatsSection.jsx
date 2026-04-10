import React from "react";

const StatsCard = ({ label, value, helper }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-slate-600">{label}</p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</h3>
      <p className="mt-1 text-sm text-slate-600">{helper}</p>
    </div>
  );
};

const StatsSection = ({ totalCompanies, showingCount, currentPage, totalPages }) => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <StatsCard
        label="Total companies"
        value={totalCompanies}
        helper="All records available in the directory"
      />

      <StatsCard
        label="Showing now"
        value={showingCount}
        helper="Companies displayed on the current page"
      />

      <StatsCard
        label="Current page"
        value={`${currentPage}/${Math.max(totalPages, 1)}`}
        helper="Pagination state for the filtered result set"
      />
    </section>
  );
};

export default StatsSection;