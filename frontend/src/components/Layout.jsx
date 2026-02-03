import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Activity,
  Brain,
  Image as ImageIcon,
  Menu,
  Bell,
  Search,
} from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: Activity, label: 'Predict Risk' },
    { to: '/accuracy', icon: ImageIcon, label: 'Model Accuracy' },
    { to: '/details', icon: Brain, label: 'Model Details' },
  ];

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      {/* Modern Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl relative z-20">
        {/* Logo Area */}
        <div className="p-8 pb-4 flex items-center gap-3">
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2.5 rounded-xl shadow-lg shadow-pink-500/20">
            <Activity size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              CardioRisk
            </h1>
            {/* <p className="text-xs text-slate-400 font-medium">
              AI Health Assistant
            </p> */}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Main Menu
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-pink-600 text-white shadow-lg shadow-primary/25'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={20}
                    className={cn(
                      'transition-colors',
                      isActive ? 'text-white' : 'group-hover:text-pink-400',
                    )}
                  />
                  <span className="font-medium tracking-wide">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile / Footer
        <div className="p-4 m-4 rounded-2xl bg-slate-800/50 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold">
              TS
            </div>
            <div>
              <p className="text-sm font-medium text-white">Dr. Smith</p>
              <p className="text-xs text-slate-400">Cardiologist</p>
            </div>
          </div>
        </div> */}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50 relative">
        {/* Top Header */}
        {/* <header className="h-20 px-8 flex items-center justify-between bg-white/50 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-slate-400">
            <Search size={20} />
            <span className="text-sm">Search patients...</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header> */}

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
