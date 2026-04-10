import React from 'react';

const navItems = [
  { label: 'Dashboard', href: '#', active: true },
  { label: 'Companies', href: '#companies', active: false }
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.18)]">
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400/20 to-blue-400/10" />
              <span className="relative">CH</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">CompanyHub</p>
              <p className="text-xs text-slate-300">Neo glass directory</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  item.active
                    ? 'border border-white/20 bg-white/15 text-white shadow-[0_0_20px_rgba(99,102,241,0.14)]'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
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