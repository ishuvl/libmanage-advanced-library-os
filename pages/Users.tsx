
import React from 'react';
import { MOCK_USERS } from '../data';

const Users: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">读者管理</h1>
        <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          添加新读者
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="text"
            placeholder="搜索读者姓名或 ID..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[18px] text-slate-400">download</span>
          导出数据
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-400">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">读者 ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">姓名</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">联系方式</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">当前借阅</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">状态</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs sm:text-sm font-mono font-bold text-slate-400 whitespace-nowrap">#RD-{user.id.padStart(7, '2023000')}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-blue-50 text-primary flex items-center justify-center text-[10px] font-black border border-blue-100 flex-shrink-0">
                        {user.avatarInitials}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm text-slate-900 font-medium whitespace-nowrap">{user.phone}</span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold truncate">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase whitespace-nowrap ${
                      user.activeBorrowCount > 3 ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.activeBorrowCount} 本 {user.activeBorrowCount > 3 && '(逾期)'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase border whitespace-nowrap ${
                      user.status === 'normal' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      <span className={`size-1.5 rounded-full ${user.status === 'normal' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      {user.status === 'normal' ? '正常' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                    <button className="text-primary hover:text-blue-700 text-xs sm:text-sm font-bold">编辑</button>
                    <button className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-bold">删除</button>
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

export default Users;
