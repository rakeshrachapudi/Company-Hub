import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-white/5 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">CompanyHub</h3>
            <p className="mt-1 text-sm text-slate-300">
              Neo glass premium dashboard for company discovery.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm text-slate-300">
            <a href="#" className="transition hover:text-white">
              Home
            </a>
            <a href="#companies" className="transition hover:text-white">
              Companies
            </a>
            <a
              href="https://github.com/rakeshrachapudi/Company-Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-sm text-slate-400">© 2026 CompanyHub. Crafted with premium glass depth.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;