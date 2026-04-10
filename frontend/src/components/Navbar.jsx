import React from 'react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand kept minimal to match premium SaaS products */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
              C
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">CompanyHub</p>
              <p className="text-xs text-slate-600">Enterprise company directory</p>
            </div>
          </div>

          {/* Small, clean nav items to keep header uncluttered */}
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Home
            </a>
            <a
              href="#companies"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Companies
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;