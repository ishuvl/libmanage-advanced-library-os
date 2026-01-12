
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">系统设置</h1>
        <p className="text-slate-500 mt-1">管理图书馆的基本信息和借阅规则配置。</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">常规配置</h2>
          <span className="material-symbols-outlined text-slate-400">tune</span>
        </div>
        <form className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">图书馆名称</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">domain</span>
                <input
                  type="text"
                  defaultValue="北京市立第一图书馆"
                  className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">这将显示在首页和所有系统生成的报告中。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">最大借阅天数</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">calendar_today</span>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">逾期罚款金额 (元/天)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">payments</span>
                  <input
                    type="number"
                    step="0.1"
                    defaultValue="0.5"
                    className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">系统通知邮箱</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
                <input
                  type="email"
                  defaultValue="system-alert@library.com"
                  className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">用于接收系统警报和每日摘要的电子邮件地址。</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-3">
            <button type="button" className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all">重置为默认值</button>
            <button type="button" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span>
              保存更改
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
