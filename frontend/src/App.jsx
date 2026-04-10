import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Filters from './components/Filters';
import CompanyCard from './components/CompanyCard';
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
    // Reset page whenever filter conditions change to avoid invalid page states
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
        {/* Hero section: premium but restrained, using only one subtle gradient area */}
        <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/15">
            Production-ready directory
          </span>

          <div className="mt-4 max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight">
              Discover and manage companies with clarity.
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              CompanyHub helps teams browse, search, filter, and organize company
              information through a premium, enterprise-grade directory experience.
            </p>
          </div>
        </section>

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

        <section id="companies" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-medium text-slate-900">Companies</h2>
              <p className="mt-1 text-sm text-slate-600">
                Showing {paginatedCompanies.length} of {filteredCompanies.length} matching companies.
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
              {ITEMS_PER_PAGE} per page
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm text-slate-600">Loading companies...</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h3 className="text-lg font-medium text-slate-900">Unable to load data</h3>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h3 className="text-lg font-medium text-slate-900">No companies found</h3>
              <p className="mt-2 text-sm text-slate-600">
                Try adjusting your search, filters, or sorting options.
              </p>
            </div>
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