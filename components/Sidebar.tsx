
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: '仪表盘', icon: 'dashboard', path: '/' },
    { name: '图书库存', icon: 'menu_book', path: '/inventory' },
    { name: '读者管理', icon: 'group', path: '/users' },
    { name: '统计报表', icon: 'bar_chart', path: '/reports' },
    { name: '系统设置', icon: 'settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[28px] icon-fill">book_4</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none">图书管家</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">高级管理系统</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-50 text-primary font-bold border-l-4 border-primary'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`material-symbols-outlined ${isActive ? 'icon-fill' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn0pW1NIr0IbIIb5tpwYn25RSVcbxtNxWYNN_DRcIJnW63ggF31aKkjza1DfRV_9Jxuy_uYPkRSdD9rdBXsHACAoDD8O1VsI_aSFb4cIMe8dhugNR4egvPaaF8oFYY8nMkneTaCrKakwXi3r2bFmDNLqoPf3Rukn91znJWsBTnTwbCqpE7Cexh1NH0r034UqZPTtv4Jk5Kb9RW3SNN7EtMkTcByyE9XogKQGrlORe9KZCnecKYC-cS8pNmJBaKXfG9WA3qCK9G1nU"
              className="size-10 rounded-full object-cover ring-2 ring-white shadow-sm"
              alt="Admin"
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">陈经理</p>
              <p className="text-xs text-slate-500 font-medium truncate">管理员</p>
            </div>
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            退出登录
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
