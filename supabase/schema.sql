-- =============================================
-- Library Management System - Supabase Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. Books Table (图书表)
-- =============================================
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'in-library' CHECK (status IN ('in-library', 'lent-out', 'lost')),
  cover_url TEXT,
  description TEXT,
  publisher TEXT,
  year TEXT,
  pages INTEGER DEFAULT 0,
  language TEXT DEFAULT '中文',
  location TEXT,
  category TEXT NOT NULL DEFAULT '其他',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_isbn ON books(isbn);

-- =============================================
-- 2. Users Table (读者表)
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  active_borrow_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'normal' CHECK (status IN ('normal', 'suspended')),
  avatar_initials TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- =============================================
-- 3. Borrow Records Table (借阅记录表)
-- =============================================
CREATE TABLE IF NOT EXISTS borrow_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reader_name TEXT NOT NULL,
  reader_id TEXT NOT NULL,
  reader_avatar TEXT,
  borrow_date TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ NOT NULL,
  return_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'returned', 'overdue')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_borrow_records_book_id ON borrow_records(book_id);
CREATE INDEX IF NOT EXISTS idx_borrow_records_user_id ON borrow_records(user_id);
CREATE INDEX IF NOT EXISTS idx_borrow_records_status ON borrow_records(status);

-- =============================================
-- 4. Triggers for updating updated_at timestamp
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_borrow_records_updated_at BEFORE UPDATE ON borrow_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 5. Function to automatically update book status
-- =============================================
CREATE OR REPLACE FUNCTION update_book_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'returned' AND OLD.status != 'returned' THEN
    -- When a book is returned, update book status
    UPDATE books SET status = 'in-library' WHERE id = NEW.book_id;
  ELSIF NEW.status = 'active' AND OLD.status = 'returned' THEN
    -- When a book is borrowed again, update book status
    UPDATE books SET status = 'lent-out' WHERE id = NEW.book_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_book_status 
  AFTER UPDATE ON borrow_records
  FOR EACH ROW EXECUTE FUNCTION update_book_status();

-- =============================================
-- 6. Function to update user's active borrow count
-- =============================================
CREATE OR REPLACE FUNCTION update_user_borrow_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'active' THEN
    -- Increment count on new active borrow
    UPDATE users SET active_borrow_count = active_borrow_count + 1 WHERE id = NEW.user_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.status = 'active' AND NEW.status = 'returned' THEN
    -- Decrement count when book is returned
    UPDATE users SET active_borrow_count = GREATEST(0, active_borrow_count - 1) WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'active' THEN
    -- Decrement count on record deletion
    UPDATE users SET active_borrow_count = GREATEST(0, active_borrow_count - 1) WHERE id = OLD.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_borrow_count
  AFTER INSERT OR UPDATE OR DELETE ON borrow_records
  FOR EACH ROW EXECUTE FUNCTION update_user_borrow_count();

-- =============================================
-- 7. Function to check for overdue records
-- =============================================
CREATE OR REPLACE FUNCTION check_overdue_records()
RETURNS void AS $$
BEGIN
  UPDATE borrow_records
  SET status = 'overdue'
  WHERE status = 'active'
    AND due_date < NOW()
    AND return_date IS NULL;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 8. Sample Data (Optional - for testing)
-- =============================================
-- Insert sample books
INSERT INTO books (title, author, isbn, status, cover_url, description, publisher, year, pages, category, location) VALUES
  ('了不起的盖茨比', 'F. 斯科特·菲茨杰拉德', '978-0743273565', 'in-library', 
   'https://lh3.googleusercontent.com/aida-public/AB6AXuA9s5UHf2GB6QHrVk1lpXpHRch1UB8j1FDvgWWtuvKsjDLJ1EQeG4bTbmyDiBrBKJd2_hgZ5B2w8oUq-TTvhCfyMhhDsx8K4-TPUeNd8971u1vINYrgruCJNkNleBVILv70shv3Ql3k2dEtUzqkt7oRBHXg22QKIa7AI7E7io82lFEXQR_kaiEM5Z9_tXKLE88SSPWqy17l2Lvb81o34Vd0h09ld6Vp-mHNv4tJEWr1QCW7ahIMGqP3sSsuoCSUGNqLFhRkJcixSeY',
   '《了不起的盖茨比》是弗朗西斯·斯科特·菲茨杰拉德的第三部小说，也是他职业生涯的最高成就。这部关于爵士时代的典范小说受到了几代读者的赞誉。',
   'Scribner', '1925', 180, '经典文学', '书架 B3, 第 2 排'),
  ('1984', '乔治·奥威尔', '978-0451524935', 'in-library',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5Jv9QzzIU_dmbtnZrlsmONECSg4n8FR-oG2wFC8xUSqIoDk60gvWSpJWqLVtcj2OL5jIXd3uwdoJl9uvvW9U6rI35dqi8wxATvYZf_cqupIEgs70kXe_DcOXDk5hk0uCqpal9gJ9eoqPM-bCMV4_oIXGK3A6FbJh_8DI3ZJJgEHs6VdICd0jf52__-tmUHbL1fsA6ZXHsXdD8WeSka7md25pCoT1Y6CSgOGNrGJ74BwKyEBMKdp35HoShXm-WAenysNY1P86ldc',
   '1984是奥威尔的一部反乌托邦小说。作品刻画了一个极权主义社会。',
   'Secker & Warburg', '1949', 328, '小说', '书架 A1, 第 1 排'),
  ('杀死一只知更鸟', '哈珀·李', '978-0061120084', 'in-library',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCe6pzJeIGp0lQLdUTRnFI2bO47nmPQHbol819XcAA-EBrWh1ZPUeELXO5xKMtzPFI4iFaRkc9fz4BJcYzSBjPgA6pAXS2DDZYfyqav1iX2XfzgyTJuXdj1b76fMjvY0nRWIhAq9fK6ywXUdfYiTIVl1vwhQ4FHgXFaqBtenO7XtWIAZuDJqQNAwgN2kTzq_apbwEzqNVNS5LBkIMMlMNiZQOJZQ_yyJSQRJDED6h9IHlvoTDjEtRDeZ-0VzUbRhbkuTadWF7dLtvM',
   '通过小女孩斯考特的视角，讲述了发生在美国南方小镇梅科姆的故事。',
   'J.B. Lippincott & Co.', '1960', 281, '经典文学', '书架 B2, 第 4 排')
ON CONFLICT (isbn) DO NOTHING;

-- Insert sample users
INSERT INTO users (name, email, phone, active_borrow_count, status, avatar_initials) VALUES
  ('张伟', 'zhangwei@email.com', '13800138000', 0, 'normal', 'ZW'),
  ('李娜', 'lina@email.com', '13900139000', 0, 'normal', 'LN'),
  ('王强', 'wang.q@example.com', '13712345678', 0, 'normal', 'WQ')
ON CONFLICT (email) DO NOTHING;

-- =============================================
-- 9. Row Level Security (RLS) Policies
-- =============================================
-- Enable RLS on all tables
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE borrow_records ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your security needs)
-- For development, we allow all operations. In production, restrict as needed.

-- Books policies
CREATE POLICY "Enable read access for all users" ON books FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON books FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON books FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON books FOR DELETE USING (true);

-- Users policies
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON users FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON users FOR DELETE USING (true);

-- Borrow records policies
CREATE POLICY "Enable read access for all users" ON borrow_records FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON borrow_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON borrow_records FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON borrow_records FOR DELETE USING (true);
