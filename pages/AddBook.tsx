
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooks } from '../contexts/BooksContext';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const { addBook } = useBooks();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '经典文学',
    publisher: '',
    year: new Date().getFullYear().toString(),
    location: '',
    description: '',
    coverUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addBook({
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      category: formData.category,
      publisher: formData.publisher,
      year: formData.year,
      location: formData.location,
      description: formData.description,
      coverUrl: formData.coverUrl
    });

    alert('图书已成功添加到系统！');
    navigate('/inventory');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/inventory" className="hover:text-primary transition-colors">图书目录</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 font-bold">新增图书</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">输入图书详细信息</h2>
          <p className="text-slate-500 text-sm mt-1">请填写以下表单以将新书入库。</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">书名 <span className="text-red-500">*</span></label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="例如：了不起的盖茨比"
                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            {/* Author */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">作者 <span className="text-red-500">*</span></label>
              <input
                required
                name="author"
                value={formData.author}
                onChange={handleChange}
                type="text"
                placeholder="例如：F. 斯科特·菲茨杰拉德"
                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            {/* ISBN */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">ISBN 编号 <span className="text-red-500">*</span></label>
              <input
                required
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                type="text"
                placeholder="例如：978-0743273565"
                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">图书分类</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              >
                <option>经典文学</option>
                <option>小说</option>
                <option>科幻</option>
                <option>社会科学</option>
                <option>自然科学</option>
              </select>
            </div>

            {/* Publisher */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">出版社</label>
              <input
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                type="text"
                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">馆藏位置</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="例如：书架 B3, 第 2 排"
                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>

            {/* Cover URL */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">封面图片 URL (可选)</label>
              <input
                name="coverUrl"
                value={formData.coverUrl}
                onChange={handleChange}
                type="text"
                placeholder="https://example.com/cover.jpg"
                className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">内容简介</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
              placeholder="输入图书的简要介绍..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/inventory')}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">save</span>
              保存并添加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
