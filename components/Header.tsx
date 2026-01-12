
import React from 'react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-[150px] sm:max-w-none">{title}</h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        <div className="hidden md:flex items-center relative w-48 lg:w-80">
          <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[22px]">search</span>
          <input
            type="text"
            placeholder="搜索 ISBN、书名、作者..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <div className="flex items-center gap-1 sm:gap-3 md:border-l md:border-slate-200 md:pl-6">
          <button className="md:hidden size-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="relative size-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="hidden sm:flex size-10 items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
