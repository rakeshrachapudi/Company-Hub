import React from 'react';

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedIndustry,
  setSelectedIndustry,
  sortOrder,
  setSortOrder,
  locations,
  industries,
  onReset
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-700">
            Search by company name
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <label htmlFor="location" className="mb-2 block text-sm font-medium text-slate-700">
            Filter by location
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="industry" className="mb-2 block text-sm font-medium text-slate-700">
            Filter by industry
          </label>
          <select
            id="industry"
            value={selectedIndustry}
            onChange={(event) => setSelectedIndustry(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="mb-2 block text-sm font-medium text-slate-700">
            Sort by name
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Tip: search, filter, and sort work together before pagination.</p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
};

export default Filters;
