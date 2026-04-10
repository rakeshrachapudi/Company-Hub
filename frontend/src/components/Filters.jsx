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
  const inputClassName =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500';

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium text-slate-900">Refine results</h2>
          <p className="mt-1 text-sm text-slate-600">
            Search, filter, and sort companies with a clean enterprise workflow.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 sm:inline-flex"
        >
          Reset Filters
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium text-slate-900">
            Search by company name
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search companies..."
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium text-slate-900">
            Filter by location
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
            className={inputClassName}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="industry" className="text-sm font-medium text-slate-900">
            Filter by industry
          </label>
          <select
            id="industry"
            value={selectedIndustry}
            onChange={(event) => setSelectedIndustry(event.target.value)}
            className={inputClassName}
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="sort" className="text-sm font-medium text-slate-900">
            Sort by name
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className={inputClassName}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      <div className="mt-4 sm:hidden">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Reset Filters
        </button>
      </div>
    </section>
  );
};

export default Filters;