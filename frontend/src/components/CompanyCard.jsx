import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-medium text-slate-900">{company.name}</h3>
          <p className="mt-1 text-sm text-slate-600">Company ID: {company.id}</p>
        </div>

        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {company.industry}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Location</p>
          <p className="mt-1 text-sm text-slate-900">{company.location}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Industry</p>
          <p className="mt-1 text-sm text-slate-900">{company.industry}</p>
        </div>
      </div>
    </article>
  );
};

export default CompanyCard;