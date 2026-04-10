import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{company.name}</h3>
          <p className="mt-1 text-sm text-slate-500">Company ID: {company.id}</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {company.industry}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-800">Location:</span> {company.location}
        </p>
        <p>
          <span className="font-medium text-slate-800">Industry:</span> {company.industry}
        </p>
      </div>
    </article>
  );
};

export default CompanyCard;
