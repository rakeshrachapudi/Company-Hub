import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg h-full">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-4 sm:mb-6">
        <div className="min-w-0 flex-1 mb-3 sm:mb-0">
          <h3 className="truncate text-base sm:text-lg font-medium text-slate-900 mb-1 sm:mb-0">
            {company.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">Company ID: {company.id}</p>
        </div>

        <span className="shrink-0 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 whitespace-nowrap">
          {company.industry}
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4 flex-1">
        <div className="rounded-xl bg-slate-50 p-3 sm:p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600 mb-1 sm:mb-2">
            Location
          </p>
          <p className="text-sm text-slate-900 truncate">{company.location}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 sm:p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600 mb-1 sm:mb-2">
          Industry
        </p>
        <p className="text-sm text-slate-900 truncate">{company.industry}</p>
      </div>
    </div>
  </article>
  );
};

export default CompanyCard;