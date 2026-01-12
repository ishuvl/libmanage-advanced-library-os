
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_RECORDS } from '../data';
import { getBookInsights } from '../services/geminiService';
import { useBooks } from '../contexts/BooksContext';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById } = useBooks();
  const book = id ? getBookById(id) : undefined;
  
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    if (book) {
      setLoadingAi(true);
      getBookInsights(book.title, book.author).then(insight => {
        setAiInsight(insight);
        setLoadingAi(false);
      });
    }
  }, [book]);

  if (!book) return <div className="p-20 text-center text-slate-500">无法找到该图书</div>;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-500">
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
        <Link to="/inventory" className="hover:text-primary transition-colors">图书目录</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-bold truncate">《{book.title}》</span>
      </nav>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10">
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="aspect-[2/3] rounded-2xl bg-slate-100 shadow-xl overflow-hidden relative group max-w-sm mx-auto">
              <img src={book.coverUrl} className="w-full h-full object-cover" alt={book.title} />
              <div className="absolute bottom-4 left-4">
                 <span className={`px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg ${
                   book.status === 'in-library' ? 'bg-emerald-500' : book.status === 'lent-out' ? 'bg-amber-500' : 'bg-red-500'
                 }`}>
                   <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
                   {book.status === 'in-library' ? '在馆' : book.status === 'lent-out' ? '已借出' : '遗失'}
                 </span>
              </div>
            </div>
            <button className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined">library_add</span>
              办理借阅
            </button>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight break-words">《{book.title}》</h1>
                <p className="text-primary font-bold text-base sm:text-lg mt-1">{book.author}</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:size-10 sm:rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors p-2"><span className="material-symbols-outlined">edit</span></button>
                <button className="flex-1 sm:size-10 sm:rounded-xl border border-red-100 flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors p-2"><span className="material-symbols-outlined">delete</span></button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] sm:text-xs font-bold border border-slate-100">{book.category}</span>
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] sm:text-xs font-bold border border-slate-100">精装本</span>
            </div>

            <div className="bg-blue-50/50 p-4 sm:p-6 rounded-2xl border border-blue-100/50 relative">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="material-symbols-outlined text-primary text-sm sm:text-[20px]">auto_awesome</span>
                <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider">AI 书评分析</h3>
              </div>
              {loadingAi ? (
                <div className="flex gap-2 items-center text-slate-400 text-xs sm:text-sm animate-pulse">
                  <div className="size-2 bg-primary rounded-full animate-bounce"></div>
                  AI 正在思考中...
                </div>
              ) : (
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">{aiInsight || "暂无 AI 分析内容"}</p>
              )}
            </div>

            <div className="space-y-2">
               <h3 className="text-slate-900 font-bold text-[10px] uppercase tracking-widest opacity-40">内容简介</h3>
               <p className="text-slate-600 leading-relaxed text-xs sm:text-sm text-justify">{book.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest">ISBN</span>
                <span className="text-slate-900 font-mono text-xs sm:text-sm break-all">{book.isbn}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest">出版社</span>
                <span className="text-slate-900 text-xs sm:text-sm font-bold truncate">{book.publisher}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-black uppercase tracking-widest">馆藏位置</span>
                <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-bold">
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px]">location_on</span>
                  <span className="truncate">{book.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">借阅历史</h3>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 text-slate-400 border-b border-slate-100">
              <tr>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest">借阅人</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest">借阅日期</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest">应还日期</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_RECORDS.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="size-8 rounded-full bg-cover bg-center border border-slate-200 flex-shrink-0"
                        style={{ backgroundImage: `url(${rec.readerAvatar || 'https://picsum.photos/40/40'})` }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{rec.readerName}</p>
                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold">{rec.readerId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs sm:text-sm text-slate-600 font-medium whitespace-nowrap">{rec.borrowDate}</td>
                  <td className="p-4 text-xs sm:text-sm text-slate-600 font-medium whitespace-nowrap">{rec.dueDate}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase border ${
                      rec.status === 'returned' ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {rec.status === 'returned' ? '已归还' : '逾期未还'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
