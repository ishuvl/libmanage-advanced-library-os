
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { BooksProvider } from './contexts/BooksContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/': return '仪表盘';
      case '/inventory': return '图书库存';
      case '/inventory/add': return '新增图书';
      case '/users': return '读者管理';
      case '/reports': return '统计报表';
      case '/settings': return '系统设置';
      default: 
        if (location.pathname.startsWith('/inventory/')) return '图书详情';
        return 'Library OS';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={getHeaderTitle()} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/add" element={<AddBook />} />
            <Route path="/inventory/:id" element={<BookDetail />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <BooksProvider>
        <AppContent />
      </BooksProvider>
    </Router>
  );
};

export default App;
