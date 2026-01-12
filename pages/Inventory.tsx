
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookStatus } from '../types';
import { useBooks } from '../contexts/BooksContext';

const Inventory: React.FC = () => {
  const { books, loading } = useBooks();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || book.isbn.includes(search);
    const matchesFilter = filter === 'all' || book.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: BookStatus) => {
    switch (status) {
      case 'in-library': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold border border-green-200">在馆</span>;
      case 'lent-out': return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-[10px] font-bold border border-amber-200">已借出</span>;
      case 'lost': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-[10px] font-bold border border-red-200">遗失</span>;
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">图书库存</h1>
          <p className="text-slate-500 text-sm mt-1">馆藏共计 {books.length} 册图书</p>
        </div>
        <Link to="/inventory/add" className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">add</span>
          新增图书
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 items-center">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="text"
            placeholder="搜索书名、ISBN 或作者..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 no-scrollbar">
          <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${filter === 'all' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>全部</button>
          <button onClick={() => setFilter('in-library')} className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${filter === 'in-library' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>在馆</button>
          <button onClick={() => setFilter('lent-out')} className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${filter === 'lent-out' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>已借出</button>
          <button onClick={() => setFilter('lost')} className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${filter === 'lost' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>遗失</button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-500 text-sm font-medium">正在加载图书数据...</p>
          </div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-2">
            <span className="material-symbols-outlined text-6xl text-slate-300">книга</span>
            <p className="text-slate-500 text-sm font-medium">暂无图书数据</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-primary/50 transition-all duration-300 flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">{getStatusBadge(book.status)}</div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link to={`/inventory/${book.id}`} className="bg-white text-primary p-2 rounded-full hover:bg-primary hover:text-white transition-all scale-75 group-hover:scale-100">
                    <span className="material-symbols-outlined">visibility</span>
                  </Link>
                  <button className="bg-white text-slate-600 p-2 rounded-full hover:bg-blue-50 transition-all scale-75 group-hover:scale-100">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="text-sm sm:text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{book.author}</p>
                <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t border-slate-50">
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 truncate pr-2">ISBN: {book.isbn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
