import React,{ useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import Filters from './components/Filters';
import CompanyCard from './components/CompanyCard';
import Pagination from './components/Pagination';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ITEMS_PER_PAGE = 6;

const SkeletonCard = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="animate-pulse">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="h-5 w-2/3 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-1/3 rounded bg-slate-100" />
          </div>
          <div className="h-6 w-20 rounded-full bg-slate-100" />
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-24 rounded bg-slate-100" />
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-28 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <svg
          className="h-6 w-6 text-slate-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7h16M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          />
        </svg>
      </div>

      <h3 className="mt-4 text-lg font-medium text-slate-900">No companies found</h3>
      <p className="mt-2 text-sm text-slate-600">
        Try adjusting the search query or clearing one of the filters.
      </p>
    </div>
  );
};

function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get(`${API_URL}/companies`);
        setCompanies(response.data);
      } catch (fetchError) {
        setError('Unable to load companies. Please check the backend server and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const uniqueLocations = useMemo(() => {
    return [...new Set(companies.map((company) => company.location))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [companies]);

  const uniqueIndustries = useMemo(() => {
    return [...new Set(companies.map((company) => company.industry))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    const result = companies.filter((company) => {
      const matchesSearch = company.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesLocation = selectedLocation
        ? company.location === selectedLocation
        : true;

      const matchesIndustry = selectedIndustry
        ? company.industry === selectedIndustry
        : true;

      return matchesSearch && matchesLocation && matchesIndustry;
    });

    return result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);
    });
  }, [companies, searchTerm, selectedLocation, selectedIndustry, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, selectedIndustry, sortOrder]);

  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <Hero />

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          locations={uniqueLocations}
          industries={uniqueIndustries}
          onReset={handleResetFilters}
        />

        <StatsSection
          totalCompanies={companies.length}
          showingCount={paginatedCompanies.length}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        <section id="companies" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-medium text-slate-900">Companies</h2>
              <p className="mt-1 text-sm text-slate-600">
                Explore structured company records in a premium directory layout.
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm">
              {ITEMS_PER_PAGE} per page
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h3 className="text-lg font-medium text-slate-900">Unable to load companies</h3>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;