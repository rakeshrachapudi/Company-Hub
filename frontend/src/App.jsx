import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import Filters from './components/Filters';
import CompanyCard from './components/CompanyCard';
import Pagination from './components/Pagination';
import AddCompanyModal from './components/AddCompanyModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ITEMS_PER_PAGE = 6;

const SkeletonCard = () => {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-[0_20px_40px_rgba(15,23,42,0.18)]">
      <div className="animate-pulse">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="h-5 w-2/3 rounded-full bg-white/15" />
            <div className="mt-3 h-4 w-1/3 rounded-full bg-white/10" />
          </div>
          <div className="h-6 w-20 rounded-full bg-indigo-500/20" />
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="h-3 w-20 rounded-full bg-white/15" />
            <div className="mt-3 h-4 w-24 rounded-full bg-white/10" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="h-3 w-20 rounded-full bg-white/15" />
            <div className="mt-3 h-4 w-28 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-10 text-center backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.24)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-[0_0_30px_rgba(99,102,241,0.16)]">
        <svg
          className="h-7 w-7 text-slate-300"
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

      <h3 className="mt-5 text-xl font-medium text-white">No companies found</h3>
      <p className="mt-2 text-sm text-slate-300">
        Try adjusting the search query or clearing one of the filters.
      </p>
    </div>
  );
};

const SuccessToast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed right-4 top-20 z-[70]">
      <div className="rounded-2xl border border-emerald-400/20 bg-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_20px_50px_rgba(16,185,129,0.12)]">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-xs font-bold text-emerald-300">
            ✓
          </div>

          <div>
            <p className="text-sm font-medium text-white">Success</p>
            <p className="text-sm text-slate-300">{message}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition hover:text-white"
            aria-label="Close toast"
          >
            ✕
          </button>
        </div>
      </div>
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = setTimeout(() => setToastMessage(''), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

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
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation ? company.location === selectedLocation : true;
      const matchesIndustry = selectedIndustry ? company.industry === selectedIndustry : true;

      return matchesSearch && matchesLocation && matchesIndustry;
    });

    return result.sort((a, b) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
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

  const handleAddCompany = async (companyData) => {
    const response = await axios.post(`${API_URL}/companies`, companyData);
    setCompanies((previousCompanies) => [response.data, ...previousCompanies]);
    setCurrentPage(1);
    setToastMessage('Company added successfully.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Global soft glow field creates depth without making the UI noisy */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[80px] h-72 w-72 rounded-full bg-indigo-500/18 blur-[120px]" />
        <div className="absolute right-[-80px] top-[180px] h-80 w-80 rounded-full bg-blue-500/14 blur-[140px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-violet-500/10 blur-[160px]" />
      </div>

      <div className="relative">
        <Navbar />
        <SuccessToast message={toastMessage} onClose={() => setToastMessage('')} />

        <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <Hero />

          {/* <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300/20 bg-indigo-500/20 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:bg-indigo-500/30 hover:shadow-[0_0_28px_rgba(99,102,241,0.28)]"
            >
              <span className="text-base leading-none">+</span>
              Add Company
            </button>
          </div> */}

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
                <h2 className="text-lg font-medium text-white">Companies</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Explore structured company records in a premium directory layout.
                </p>
              </div>

              {/* <div className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-slate-300 backdrop-blur-md">
                {ITEMS_PER_PAGE} per page
              </div> */}

                <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300/20 bg-indigo-500/20 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:bg-indigo-500/30 hover:shadow-[0_0_28px_rgba(99,102,241,0.28)]"
            >
              <span className="text-base leading-none">+</span>
              Add Company
            </button>
          </div>

            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-white/20 bg-white/10 p-10 text-center backdrop-blur-xl">
                <h3 className="text-lg font-medium text-white">Unable to load companies</h3>
                <p className="mt-2 text-sm text-slate-300">{error}</p>
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

        <AddCompanyModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCompany={handleAddCompany}
        />
      </div>
    </div>
  );
}

export default App;