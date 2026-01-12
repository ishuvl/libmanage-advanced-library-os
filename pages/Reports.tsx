
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const barData = [
    { name: '周一', value: 156 },
    { name: '周二', value: 124 },
    { name: '周三', value: 208 },
    { name: '周四', value: 142 },
    { name: '周五', value: 245 },
    { name: '周六', value: 86 },
    { name: '周日', value: 104 },
  ];

  const pieData = [
    { name: '文学', value: 35, color: '#195de6' },
    { name: '社会科学', value: 25, color: '#60a5fa' },
    { name: '自然科学', value: 20, color: '#93c5fd' },
    { name: '其他', value: 20, color: '#e2e8f0' },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">统计报表</h1>
          <p className="text-slate-500 text-sm mt-1">查看图书馆运营数据概览与分析</p>
        </div>
        <div className="flex flex-col xs:flex-row items-center gap-3 w-full sm:w-auto">
          <select className="w-full sm:w-auto bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
            <option>本月</option>
            <option>本季度</option>
            <option>本年度</option>
          </select>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            导出报表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">周借阅趋势</h3>
            <p className="text-slate-400 text-xs font-medium">过去7天借阅数据统计</p>
          </div>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="value" fill="#195de6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">图书类别分布</h3>
            <p className="text-slate-400 text-xs font-medium">馆藏资源分类比例</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 min-h-[300px]">
            <div className="h-[200px] w-full sm:w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1 w-full">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 sm:gap-3">
                  <span className="size-2 sm:size-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase truncate">{item.name}</p>
                    <p className="text-sm sm:text-lg font-black text-slate-900 leading-none">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
