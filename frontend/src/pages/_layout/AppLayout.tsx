import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;

export function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <NavLink to="/" onClick={closeMenu} className="text-base font-semibold text-slate-900">
              AutoFlex
            </NavLink>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-2 md:flex">
              <NavLink to="/" className={desktopLinkClass}>
                Home
              </NavLink>
              <NavLink to="/products" className={desktopLinkClass}>
                Products
              </NavLink>
              <NavLink to="/raw-materials" className={desktopLinkClass}>
                Raw Materials
              </NavLink>
              <NavLink to="/production-capacity" className={desktopLinkClass}>
                Production Capacity
              </NavLink>
            </nav>
          </div>

          {/* Mobile nav (vertical) */}
          {isMenuOpen && (
            <nav className="mt-3 space-y-1 border-t pt-3 md:hidden">
              <NavLink to="/" onClick={closeMenu} className={mobileLinkClass}>
                Home
              </NavLink>
              <NavLink to="/products" onClick={closeMenu} className={mobileLinkClass}>
                Products
              </NavLink>
              <NavLink to="/raw-materials" onClick={closeMenu} className={mobileLinkClass}>
                Raw Materials
              </NavLink>
              <NavLink to="/production-capacity" onClick={closeMenu} className={mobileLinkClass}>
                Production Capacity
              </NavLink>
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
