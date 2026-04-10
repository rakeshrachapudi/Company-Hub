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
    'w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 backdrop-blur-md transition duration-300 focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-400/40';

  return (
    <section className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.28)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-lg font-medium text-white">Refine results</h2>
          <p className="mt-1 text-sm text-slate-300">
            Search, filter, and sort through a refined glass interface.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-500/20 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:scale-[1.02] hover:bg-indigo-500/30 hover:shadow-[0_0_24px_rgba(99,102,241,0.22)]"
        >
          Reset Filters
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium text-white">
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
          <label htmlFor="location" className="text-sm font-medium text-white">
            Filter by location
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
            className={controlClassName}
          >
            <option value="" className="bg-slate-800 text-white">
              All Locations
            </option>
            {locations.map((location) => (
              <option key={location} value={location} className="bg-slate-800 text-white">
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="industry" className="text-sm font-medium text-white">
            Filter by industry
          </label>
          <select
            id="industry"
            value={selectedIndustry}
            onChange={(event) => setSelectedIndustry(event.target.value)}
            className={controlClassName}
          >
            <option value="" className="bg-slate-800 text-white">
              All Industries
            </option>
            {industries.map((industry) => (
              <option key={industry} value={industry} className="bg-slate-800 text-white">
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="sort" className="text-sm font-medium text-white">
            Sort by name
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className={controlClassName}
          >
            <option value="asc" className="bg-slate-800 text-white">
              A-Z
            </option>
            <option value="desc" className="bg-slate-800 text-white">
              Z-A
            </option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Filters;