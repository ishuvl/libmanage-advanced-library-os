# 🚀 Library Management System - Supabase Integration

这是一个现代化的图书管理系统，使用 React + TypeScript + Supabase 构建。

## 📋 功能特性

- ✅ 图书管理（增删改查）
- ✅ 读者管理
- ✅ 借阅记录管理
- ✅ 实时数据同步
- ✅ 统计报表
- ✅ AI 书评分析

## 🛠️ Supabase 集成设置

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/) 并创建账号
2. 创建一个新项目
3. 记录项目的 URL 和 anon key

### 2. 初始化数据库

1. 在 Supabase Dashboard 中，进入 SQL Editor
2. 复制 `supabase/schema.sql` 文件的全部内容
3. 粘贴到 SQL Editor 并执行
4. 确认所有表和触发器创建成功

### 3. 配置环境变量

1. 复制 `.env.example` 文件并重命名为 `.env`
   ```bash
   cp .env.example .env
   ```

2. 在 `.env` 文件中填入你的 Supabase 配置：
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### 4. 安装依赖

```bash
npm install
```

### 5. 运行项目

```bash
npm run dev
```

## 📊 数据库结构

### Books Table (图书表)
- `id`: UUID (主键)
- `title`: 书名
- `author`: 作者
- `isbn`: ISBN 编号
- `status`: 状态 (in-library | lent-out | lost)
- `category`: 分类
- `cover_url`: 封面图片
- `description`: 简介
- `publisher`: 出版社
- `year`: 出版年份
- `pages`: 页数
- `language`: 语言
- `location`: 馆藏位置

### Users Table (读者表)
- `id`: UUID (主键)
- `name`: 姓名
- `email`: 邮箱
- `phone`: 电话
- `registration_date`: 注册日期
- `active_borrow_count`: 当前借阅数
- `status`: 状态 (normal | suspended)
- `avatar_initials`: 头像缩写

### Borrow Records Table (借阅记录表)
- `id`: UUID (主键)
- `book_id`: 图书 ID (外键)
- `user_id`: 读者 ID (外键)
- `reader_name`: 读者姓名
- `reader_id`: 读者编号
- `borrow_date`: 借阅日期
- `due_date`: 应还日期
- `return_date`: 实际归还日期
- `status`: 状态 (active | returned | overdue)

## 🔥 核心功能说明

### 新增图书
在"新增图书"页面填写表单，点击"保存并添加"按钮，数据会自动保存到 Supabase。

### 图书列表
页面加载时自动从 Supabase 读取所有图书数据并显示。

### 实时同步
所有数据操作都直接通过 Supabase 客户端进行，确保数据实时更新。

## 📁 项目文件结构

```
libmanage/
├── lib/
│   └── supabase.ts          # Supabase 客户端配置
├── services/
│   └── dataService.ts       # 数据服务层 (CRUD 操作)
├── contexts/
│   └── BooksContext.tsx     # 图书状态管理 (已集成 Supabase)
├── pages/
│   ├── AddBook.tsx          # 新增图书页面
│   ├── Inventory.tsx        # 图书库存页面
│   ├── BookDetail.tsx       # 图书详情页面
│   └── Users.tsx            # 读者管理页面
├── supabase/
│   └── schema.sql           # 数据库架构
└── .env                     # 环境变量配置
```

## 🎯 API 使用示例

### 获取所有图书
```typescript
import { getAllBooks } from './services/dataService';

const books = await getAllBooks();
```

### 添加新图书
```typescript
import { addBook } from './services/dataService';

const newBook = await addBook({
  title: '书名',
  author: '作者',
  isbn: '978-1234567890',
  category: '经典文学',
  publisher: '出版社',
  year: '2024',
  location: '书架 A1',
  description: '内容简介',
  coverUrl: 'https://example.com/cover.jpg'
});
```

### 获取统计数据
```typescript
import { getStats } from './services/dataService';

const stats = await getStats();
// { totalBooks, activeBorrows, overdueBooks, newReaders }
```

## 🔒 安全配置

当前配置为开发环境，所有表启用了 RLS (Row Level Security) 并允许所有操作。

**生产环境建议**：
1. 在 Supabase Dashboard 中配置用户认证
2. 更新 RLS 策略，限制匿名用户的操作权限
3. 使用服务端 API 密钥处理敏感操作

## 🐛 故障排除

### 无法连接 Supabase
- 检查 `.env` 文件配置是否正确
- 确认 Supabase 项目状态正常
- 查看浏览器控制台错误信息

### 数据无法保存
- 检查数据库表是否正确创建
- 确认 RLS 策略已正确配置
- 查看 Supabase Dashboard > Logs 获取详细错误

## 📚 技术栈

- **前端框架**: React 19 + TypeScript
- **路由**: React Router v7
- **数据库**: Supabase (PostgreSQL)
- **UI 库**: Tailwind CSS
- **图表**: Recharts
- **AI**: Google Gemini

## 📝 License

MIT
