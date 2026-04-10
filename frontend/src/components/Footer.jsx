import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">CompanyHub</h3>
            <p className="mt-1 text-sm text-slate-600">
              A premium companies directory built for fast browsing and filtering.
            </p>
          </div>

          <p className="text-sm text-slate-600">
            © 2026 CompanyHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;