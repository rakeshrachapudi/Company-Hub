import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import CompanyCard from './components/CompanyCard';
import Filters from './components/Filters';
import Pagination from './components/Pagination';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ITEMS_PER_PAGE = 6;

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
    return [...new Set(companies.map((company) => company.location))].sort((a, b) => a.localeCompare(b));
  }, [companies]);

  const uniqueIndustries = useMemo(() => {
    return [...new Set(companies.map((company) => company.industry))].sort((a, b) => a.localeCompare(b));
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    const searchedCompanies = companies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation ? company.location === selectedLocation : true;
      const matchesIndustry = selectedIndustry ? company.industry === selectedIndustry : true;

      return matchesSearch && matchesLocation && matchesIndustry;
    });

    return searchedCompanies.sort((firstCompany, secondCompany) => {
      if (sortOrder === 'asc') {
        return firstCompany.name.localeCompare(secondCompany.name);
      }

      return secondCompany.name.localeCompare(firstCompany.name);
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-soft md:px-10">
          <p className="mb-3 inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-blue-100">
            Companies Directory
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">CompanyHub</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            Browse, search, filter, sort, and paginate company listings using a clean React and Tailwind UI powered by an Express backend.
          </p>
        </header>

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

        <section className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Available Companies</h2>
            <p className="text-sm text-slate-500">
              Showing {paginatedCompanies.length} of {filteredCompanies.length} matching companies.
            </p>
          </div>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-soft">
            {ITEMS_PER_PAGE} per page
          </span>
        </section>

        {loading ? (
          <div className="mt-10 flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white text-lg font-medium text-slate-500">
            Loading companies...
          </div>
        ) : error ? (
          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700">
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">No companies found</h3>
            <p className="mt-2 text-sm text-slate-500">Try changing the search term or clearing a filter.</p>
          </div>
        ) : (
          <>
            <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </section>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
