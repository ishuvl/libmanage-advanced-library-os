# 🚀 快速参考卡

## ⚡ 一分钟快速开始

```bash
# 1. 安装依赖（已完成 ✅）
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env，填入 Supabase 配置

# 3. 启动项目
npm run dev
```

## 🔑 Supabase 配置步骤

1. **创建项目**: https://supabase.com → New Project
2. **获取凭证**: Settings → API → 复制 URL 和 anon key
3. **初始化数据库**: SQL Editor → 粘贴 `supabase/schema.sql` → Run
4. **填写 .env**: 粘贴 URL 和 key

## 📁 关键文件

| 文件 | 用途 |
|------|------|
| `supabase/schema.sql` | 数据库架构（在 Supabase 执行） |
| `.env` | 环境变量配置 |
| `lib/supabase.ts` | Supabase 客户端 |
| `services/dataService.ts` | 数据操作 API |
| `contexts/BooksContext.tsx` | 图书状态管理 |

## 🎯 已实现功能

✅ 添加图书 → 自动保存到 Supabase  
✅ 加载图书 → 从 Supabase 读取  
✅ 搜索图书 → 实时搜索  
✅ 筛选图书 → 按状态筛选  

## 💻 常用命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产版本
```

## 🔧 数据操作示例

### 获取所有图书
```typescript
import { getAllBooks } from './services/dataService';
const books = await getAllBooks();
```

### 添加图书
```typescript
import { addBook } from './services/dataService';
await addBook({
  title: '书名',
  author: '作者',
  isbn: '978-...',
  category: '分类',
  // ... 其他字段
});
```

### 搜索图书
```typescript
import { searchBooks } from './services/dataService';
const results = await searchBooks('关键词');
```

### 获取统计
```typescript
import { getStats } from './services/dataService';
const stats = await getStats();
```

## 🐛 常见问题速查

| 问题 | 解决方案 |
|------|---------|
| 无法加载数据 | 检查 `.env` 配置和网络 |
| 保存失败 | 确认已执行 `schema.sql` |
| TypeScript 报错 | 运行 `npm install` |
| 环境变量不生效 | 重启开发服务器 |

## 📚 文档链接

- 📖 详细指南: `SUPABASE_GUIDE.md`
- ✅ 完成清单: `INTEGRATION_COMPLETE.md`
- 📝 项目说明: `README.md`

## 🎯 测试步骤

1. 启动项目: `npm run dev`
2. 访问: http://localhost:3000
3. 点击"新增图书"
4. 填写表单并保存
5. 在 Supabase Dashboard 验证数据
6. 刷新页面，数据依然存在 ✅

---

**需要帮助？** 查看 `SUPABASE_GUIDE.md` 获取详细说明
