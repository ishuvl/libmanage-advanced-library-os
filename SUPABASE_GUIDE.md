# 📘 Supabase 集成使用指南

## 快速开始

### 第一步：设置 Supabase 项目

1. **创建 Supabase 账号**
   - 访问 https://supabase.com/
   - 注册账号并登录

2. **创建新项目**
   - 点击 "New Project"
   - 填写项目名称和数据库密码
   - 选择地区（建议选择离你最近的）
   - 等待项目初始化完成（约 2 分钟）

3. **获取 API 凭证**
   - 在 Dashboard 左侧菜单点击 Settings (齿轮图标)
   - 点击 "API"
   - 复制以下两个值：
     * **Project URL**: `https://xxxxx.supabase.co`
     * **anon public key**: `eyJhbGciOi...` (很长的字符串)

### 第二步：初始化数据库

1. **打开 SQL Editor**
   - 在 Supabase Dashboard 左侧菜单点击 "SQL Editor"
   - 点击 "+ New query" 创建新查询

2. **执行数据库架构**
   - 打开本项目的 `supabase/schema.sql` 文件
   - 复制全部内容
   - 粘贴到 SQL Editor
   - 点击 "Run" 按钮执行
   - 等待执行完成，确认没有错误

3. **验证表创建成功**
   - 在左侧菜单点击 "Table Editor"
   - 应该能看到三个表：
     * `books` (图书表)
     * `users` (读者表)
     * `borrow_records` (借阅记录表)

### 第三步：配置项目

1. **复制环境变量文件**
   ```bash
   # Windows (PowerShell)
   Copy-Item .env.example .env

   # Mac/Linux
   cp .env.example .env
   ```

2. **编辑 .env 文件**
   ```env
   VITE_SUPABASE_URL=https://你的项目ID.supabase.co
   VITE_SUPABASE_ANON_KEY=你的anon_key
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **启动项目**
   ```bash
   npm run dev
   ```

5. **打开浏览器**
   - 访问 http://localhost:3000
   - 开始使用！

## 功能测试

### 测试新增图书

1. 启动项目后，点击左侧菜单 "图书库存"
2. 点击右上角 "新增图书" 按钮
3. 填写表单：
   - 书名：测试图书
   - 作者：测试作者
   - ISBN：978-1234567890
   - 其他字段按需填写
4. 点击 "保存并添加" 按钮
5. 系统会跳转回图书列表，新书应该出现在列表顶部

### 验证数据已保存

1. 在 Supabase Dashboard 点击 "Table Editor"
2. 选择 `books` 表
3. 应该能看到刚刚添加的图书记录
4. 刷新浏览器页面，数据仍然存在（证明是从数据库读取，而非内存）

### 测试数据读取

1. 关闭并重新打开浏览器
2. 访问 http://localhost:3000
3. 之前添加的图书应该仍然显示
4. 这证明数据已持久化保存到 Supabase

## 数据操作示例

### 在代码中使用数据服务

#### 1. 获取所有图书
```typescript
import { getAllBooks } from './services/dataService';

// 在组件中使用
useEffect(() => {
  const fetchBooks = async () => {
    const books = await getAllBooks();
    console.log('所有图书:', books);
  };
  fetchBooks();
}, []);
```

#### 2. 添加新图书
```typescript
import { addBook } from './services/dataService';

const handleAddBook = async () => {
  try {
    const newBook = await addBook({
      title: '三体',
      author: '刘慈欣',
      isbn: '978-7536692930',
      category: '科幻',
      publisher: '重庆出版社',
      year: '2008',
      location: '书架 C1, 第 3 排',
      description: '地球往事三部曲第一部',
      coverUrl: 'https://example.com/cover.jpg'
    });
    console.log('添加成功:', newBook);
  } catch (error) {
    console.error('添加失败:', error);
    alert('添加图书失败，请检查网络连接');
  }
};
```

#### 3. 搜索图书
```typescript
import { searchBooks } from './services/dataService';

const handleSearch = async (query: string) => {
  const results = await searchBooks(query);
  console.log('搜索结果:', results);
};

// 使用
handleSearch('三体'); // 搜索标题、作者或 ISBN 包含 "三体" 的图书
```

#### 4. 获取统计数据
```typescript
import { getStats } from './services/dataService';

const loadStats = async () => {
  const stats = await getStats();
  console.log('统计数据:', {
    总图书数: stats.totalBooks,
    活跃借阅: stats.activeBorrows,
    逾期图书: stats.overdueBooks,
    新增读者: stats.newReaders
  });
};
```

#### 5. 管理读者
```typescript
import { addUser, getAllUsers } from './services/dataService';

// 添加新读者
const addNewUser = async () => {
  const user = await addUser({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: 'normal',
    avatarInitials: 'ZS'
  });
  console.log('新读者:', user);
};

// 获取所有读者
const loadUsers = async () => {
  const users = await getAllUsers();
  console.log('所有读者:', users);
};
```

## 常见问题

### Q1: 启动后看不到数据？
**A**: 检查以下几点：
1. `.env` 文件配置是否正确
2. Supabase 项目是否正常运行
3. 浏览器控制台是否有错误信息
4. 检查数据库表是否创建成功

### Q2: 保存数据时报错？
**A**: 
1. 确认已执行 `supabase/schema.sql` 创建表结构
2. 检查 RLS (Row Level Security) 策略是否正确
3. 在 Supabase Dashboard > Logs 查看详细错误

### Q3: 如何查看数据库实时日志？
**A**:
1. 在 Supabase Dashboard 点击 "Logs"
2. 选择 "Database" 查看数据库操作日志
3. 选择 "API" 查看 API 请求日志

### Q4: 如何重置数据库？
**A**:
```sql
-- 在 SQL Editor 中执行以下命令
TRUNCATE books, users, borrow_records RESTART IDENTITY CASCADE;
```

### Q5: 如何备份数据？
**A**:
1. 在 Supabase Dashboard 点击 "Database"
2. 点击 "Backups"
3. 点击 "Create backup" 创建备份点

## 进阶配置

### 启用实时订阅（Realtime）

如果你想要实现多用户实时协作，可以启用 Supabase Realtime：

```typescript
import { supabase } from './lib/supabase';

// 订阅图书表变化
const subscription = supabase
  .channel('books-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'books' },
    (payload) => {
      console.log('图书数据变化:', payload);
      // 刷新本地数据
    }
  )
  .subscribe();

// 取消订阅
subscription.unsubscribe();
```

### 添加用户认证

如果需要用户登录功能：

1. 在 Supabase Dashboard 启用 Authentication
2. 更新 RLS 策略以限制匿名访问
3. 在应用中添加登录逻辑：

```typescript
// 邮箱密码登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// 获取当前用户
const { data: { user } } = await supabase.auth.getUser();
```

## 生产环境部署提醒

在部署到生产环境前：

1. ✅ 更新 RLS 策略，限制匿名用户权限
2. ✅ 启用用户认证
3. ✅ 配置域名白名单
4. ✅ 设置数据库备份策略
5. ✅ 监控数据库性能和使用量

## 获取帮助

- 📖 [Supabase 官方文档](https://supabase.com/docs)
- 💬 [Supabase Discord 社区](https://discord.supabase.com/)
- 🐛 [GitHub Issues](https://github.com/supabase/supabase/issues)

---

**祝你使用愉快！** 🎉
