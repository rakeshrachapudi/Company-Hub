import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">CompanyHub</h3>
            <p className="mt-3 text-sm text-slate-600">
              A production-ready companies directory designed with a premium SaaS experience.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Links</h4>
            <div className="mt-3 space-y-2">
              <a href="#" className="block text-sm text-slate-600 transition hover:text-slate-900">
                Home
              </a>
              <a
                href="#companies"
                className="block text-sm text-slate-600 transition hover:text-slate-900"
              >
                Companies
              </a>
              <a
                href="https://github.com/rakeshrachapudi/Company-Hub"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-slate-600 transition hover:text-slate-900"
              >
                GitHub
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">About</h4>
            <p className="mt-3 text-sm text-slate-600">
              Built with React, Tailwind CSS, Node.js, and Express for a clean enterprise workflow.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-600">
            © 2026 CompanyHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;