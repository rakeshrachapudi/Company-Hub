import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Primary information is the company name, so it gets the strongest emphasis */}
          <h3 className="truncate text-lg font-semibold text-slate-900">
            {company.name}
          </h3>
          <p className="mt-1 text-sm text-slate-600">Company ID: {company.id}</p>
        </div>

        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {company.industry}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-sm font-medium text-slate-900">Location</span>
          <span className="text-sm text-slate-600">{company.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-900">Industry</span>
          <span className="text-sm text-slate-600">{company.industry}</span>
        </div>
      </div>
    </article>
  );
};

export default CompanyCard;