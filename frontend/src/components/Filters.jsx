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
  const controlClassName =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500';

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-medium text-slate-900">Refine directory</h2>
          <p className="mt-1 text-sm text-slate-600">
            Search, filter, and sort company records using consistent controls.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:scale-[1.02] hover:bg-indigo-700"
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
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={controlClassName}
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
            className={controlClassName}
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
            className={controlClassName}
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
            className={controlClassName}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Filters;