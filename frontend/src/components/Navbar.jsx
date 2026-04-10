import React from 'react';

const navItems = [
  { label: 'Home', href: '#', active: true },
  { label: 'Companies', href: '#companies', active: false }
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Premium brand lockup with minimal visual noise */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
              CH
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">CompanyHub</p>
              <p className="text-xs text-slate-600">Premium companies directory</p>
            </div>
          </div>

          {/* Active link gets a subtle filled background instead of loud colors */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  item.active
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;