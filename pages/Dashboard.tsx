
import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../contexts/BooksContext';

const Dashboard: React.FC = () => {
  const { books } = useBooks();
  
  const stats = [
    { name: '图书总数', value: books.length.toLocaleString(), trend: '+2.5%', icon: 'article', bgColor: 'bg-blue-50', iconColor: 'text-blue-500', trendColor: 'text-green-500 bg-green-50' },
    { name: '当前借阅', value: '432', trend: '+12%', icon: 'badge', bgColor: 'bg-indigo-50', iconColor: 'text-indigo-500', trendColor: 'text-green-500 bg-green-50' },
    { name: '逾期未还', value: '15', trend: '5 件', icon: 'warning', bgColor: 'bg-orange-50', iconColor: 'text-orange-500', trendColor: 'text-red-500 bg-red-50' },
    { name: '新增读者', value: '128', trend: '+8%', icon: 'person_add', bgColor: 'bg-emerald-50', iconColor: 'text-emerald-500', trendColor: 'text-green-500 bg-green-50' },
  ];

  const activities = [
    { user: 'Sarah Jenkins', action: '借阅了', book: 'The Art of War', time: '2分钟前', avatar: 'SJ' },
    { user: 'Michael Chen', action: '归还了', book: 'Atomic Habits', time: '15分钟前', avatar: 'MC' },
    { user: 'Emma Wilson', action: '新读者注册', book: '', time: '1小时前', avatar: 'EW' },
    { user: 'David Kim', action: '借阅了', book: 'Intro to Python', time: '3小时前', avatar: 'DK' },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">仪表盘</h1>
          <p className="text-slate-500 text-sm mt-1">欢迎回来，这是今日图书馆概况。</p>
        </div>
        <Link to="/inventory/add" className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          新增图书
        </Link>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s) => (
          <div key={s.name} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 sm:gap-5 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start">
              <div className={`p-2.5 sm:p-3 rounded-xl ${s.bgColor} ${s.iconColor} group-hover:bg-primary group-hover:text-white transition-all duration-300`}>
                <span className="material-symbols-outlined text-[20px] sm:text-[24px] icon-fill">{s.icon}</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${s.trendColor} uppercase tracking-tight`}>
                {s.trend}
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">{s.name}</p>
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 mt-1">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">新书速递</h2>
            <Link to="/inventory" className="text-sm font-bold text-primary hover:underline">查看全部</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {books.slice(0, 3).map((book) => (
              <div key={book.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div 
                  className="h-40 sm:h-48 w-full rounded-2xl bg-cover bg-center shadow-inner"
                  style={{ backgroundImage: `url(${book.coverUrl})` }}
                />
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-wider">{book.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <span className="material-symbols-outlined text-[14px] icon-fill">star</span>
                      <span className="text-xs font-bold text-slate-400">4.8</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 line-clamp-1 text-base sm:text-lg">{book.title}</h3>
                  <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">{book.author}</p>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/inventory/${book.id}`} className="flex-1 bg-primary/5 hover:bg-primary/10 text-primary py-2 sm:py-2.5 rounded-xl text-xs font-black text-center transition-all">查看详情</Link>
                    <button className="size-8 sm:size-10 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">favorite</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">最近活动</h2>
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-50">
            {activities.map((act, i) => (
              <div key={i} className="p-4 flex gap-4 items-start hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="size-10 sm:size-11 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-[10px] sm:text-xs font-black border border-slate-100 flex-shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                  {act.avatar}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                    <span className="font-bold text-slate-900">{act.user}</span> {act.action} <span className="text-primary font-bold">{act.book}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {act.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
