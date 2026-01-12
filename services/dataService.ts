import { supabase } from '../lib/supabase';
import { Book, User, BorrowRecord } from '../types';

// =============================================
// Books Service
// =============================================

/**
 * 获取所有图书
 */
export const getAllBooks = async (): Promise<Book[]> => {
    const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching books:', error);
        throw error;
    }

    // 转换数据库字段名（snake_case）到前端类型（camelCase）
    return (data || []).map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        status: book.status as Book['status'],
        coverUrl: book.cover_url || '',
        description: book.description || '',
        publisher: book.publisher || '',
        year: book.year || '',
        pages: book.pages,
        language: book.language,
        location: book.location || '',
        category: book.category,
    }));
};

/**
 * 根据 ID 获取单本图书
 */
export const getBookById = async (id: string): Promise<Book | null> => {
    const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching book:', error);
        return null;
    }

    if (!data) return null;

    return {
        id: data.id,
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        status: data.status as Book['status'],
        coverUrl: data.cover_url || '',
        description: data.description || '',
        publisher: data.publisher || '',
        year: data.year || '',
        pages: data.pages,
        language: data.language,
        location: data.location || '',
        category: data.category,
    };
};

/**
 * 添加新图书
 */
export const addBook = async (
    book: Omit<Book, 'id' | 'status' | 'pages' | 'language'>
): Promise<Book> => {
    const { data, error } = await supabase
        .from('books')
        .insert({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            cover_url: book.coverUrl || `https://picsum.photos/seed/${book.isbn}/400/600`,
            description: book.description,
            publisher: book.publisher,
            year: book.year,
            pages: 0,
            language: '中文',
            location: book.location,
            category: book.category,
            status: 'in-library',
        })
        .select()
        .single();

    if (error) {
        console.error('Error adding book:', error);
        throw error;
    }

    return {
        id: data.id,
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        status: data.status as Book['status'],
        coverUrl: data.cover_url || '',
        description: data.description || '',
        publisher: data.publisher || '',
        year: data.year || '',
        pages: data.pages,
        language: data.language,
        location: data.location || '',
        category: data.category,
    };
};

/**
 * 更新图书信息
 */
export const updateBook = async (
    id: string,
    updates: Partial<Omit<Book, 'id'>>
): Promise<Book> => {
    const { data, error } = await supabase
        .from('books')
        .update({
            title: updates.title,
            author: updates.author,
            isbn: updates.isbn,
            status: updates.status,
            cover_url: updates.coverUrl,
            description: updates.description,
            publisher: updates.publisher,
            year: updates.year,
            pages: updates.pages,
            language: updates.language,
            location: updates.location,
            category: updates.category,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating book:', error);
        throw error;
    }

    return {
        id: data.id,
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        status: data.status as Book['status'],
        coverUrl: data.cover_url || '',
        description: data.description || '',
        publisher: data.publisher || '',
        year: data.year || '',
        pages: data.pages,
        language: data.language,
        location: data.location || '',
        category: data.category,
    };
};

/**
 * 删除图书
 */
export const deleteBook = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

/**
 * 搜索图书（按标题、作者或 ISBN）
 */
export const searchBooks = async (query: string): Promise<Book[]> => {
    const { data, error } = await supabase
        .from('books')
        .select('*')
        .or(`title.ilike.%${query}%,author.ilike.%${query}%,isbn.ilike.%${query}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error searching books:', error);
        throw error;
    }

    return (data || []).map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        status: book.status as Book['status'],
        coverUrl: book.cover_url || '',
        description: book.description || '',
        publisher: book.publisher || '',
        year: book.year || '',
        pages: book.pages,
        language: book.language,
        location: book.location || '',
        category: book.category,
    }));
};

// =============================================
// Users Service
// =============================================

/**
 * 获取所有读者
 */
export const getAllUsers = async (): Promise<User[]> => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        throw error;
    }

    return (data || []).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        registrationDate: new Date(user.registration_date).toISOString().split('T')[0],
        activeBorrowCount: user.active_borrow_count,
        status: user.status as User['status'],
        avatarInitials: user.avatar_initials || '',
    }));
};

/**
 * 根据 ID 获取单个读者
 */
export const getUserById = async (id: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    if (!data) return null;

    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        registrationDate: new Date(data.registration_date).toISOString().split('T')[0],
        activeBorrowCount: data.active_borrow_count,
        status: data.status as User['status'],
        avatarInitials: data.avatar_initials || '',
    };
};

/**
 * 添加新读者
 */
export const addUser = async (user: Omit<User, 'id' | 'registrationDate' | 'activeBorrowCount'>): Promise<User> => {
    const { data, error } = await supabase
        .from('users')
        .insert({
            name: user.name,
            email: user.email,
            phone: user.phone,
            status: user.status,
            avatar_initials: user.avatarInitials,
            active_borrow_count: 0,
        })
        .select()
        .single();

    if (error) {
        console.error('Error adding user:', error);
        throw error;
    }

    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        registrationDate: new Date(data.registration_date).toISOString().split('T')[0],
        activeBorrowCount: data.active_borrow_count,
        status: data.status as User['status'],
        avatarInitials: data.avatar_initials || '',
    };
};

/**
 * 更新读者信息
 */
export const updateUser = async (id: string, updates: Partial<Omit<User, 'id' | 'registrationDate'>>): Promise<User> => {
    const { data, error } = await supabase
        .from('users')
        .update({
            name: updates.name,
            email: updates.email,
            phone: updates.phone,
            status: updates.status,
            avatar_initials: updates.avatarInitials,
            active_borrow_count: updates.activeBorrowCount,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating user:', error);
        throw error;
    }

    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        registrationDate: new Date(data.registration_date).toISOString().split('T')[0],
        activeBorrowCount: data.active_borrow_count,
        status: data.status as User['status'],
        avatarInitials: data.avatar_initials || '',
    };
};

/**
 * 删除读者
 */
export const deleteUser = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// =============================================
// Borrow Records Service
// =============================================

/**
 * 获取所有借阅记录
 */
export const getAllBorrowRecords = async (): Promise<BorrowRecord[]> => {
    const { data, error } = await supabase
        .from('borrow_records')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching borrow records:', error);
        throw error;
    }

    return (data || []).map(record => ({
        id: record.id,
        readerName: record.reader_name,
        readerId: record.reader_id,
        readerAvatar: record.reader_avatar || undefined,
        borrowDate: new Date(record.borrow_date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '年').replace(/年(\d+)年/, '年$1月') + '日',
        dueDate: new Date(record.due_date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '年').replace(/年(\d+)年/, '年$1月') + '日',
        returnDate: record.return_date
            ? new Date(record.return_date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '年').replace(/年(\d+)年/, '年$1月') + '日'
            : undefined,
        status: record.status as BorrowRecord['status'],
    }));
};

/**
 * 根据图书 ID 获取借阅记录
 */
export const getBorrowRecordsByBookId = async (bookId: string): Promise<BorrowRecord[]> => {
    const { data, error } = await supabase
        .from('borrow_records')
        .select('*')
        .eq('book_id', bookId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching borrow records:', error);
        throw error;
    }

    return (data || []).map(record => ({
        id: record.id,
        readerName: record.reader_name,
        readerId: record.reader_id,
        readerAvatar: record.reader_avatar || undefined,
        borrowDate: new Date(record.borrow_date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '年').replace(/年(\d+)年/, '年$1月') + '日',
        dueDate: new Date(record.due_date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\//g, '年').replace(/年(\d+)年/, '年$1月') + '日',
        returnDate: record.return_date
            ? new Date(record.return_date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '年').replace(/年(\d+)年/, '年$1月') + '日'
            : undefined,
        status: record.status as BorrowRecord['status'],
    }));
};

/**
 * 创建借阅记录
 */
export const createBorrowRecord = async (
    record: {
        bookId: string;
        userId: string;
        readerName: string;
        readerId: string;
        readerAvatar?: string;
        dueDate: string;
    }
): Promise<BorrowRecord> => {
    const { data, error } = await supabase
        .from('borrow_records')
        .insert({
            book_id: record.bookId,
            user_id: record.userId,
            reader_name: record.readerName,
            reader_id: record.readerId,
            reader_avatar: record.readerAvatar,
            due_date: record.dueDate,
            status: 'active',
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating borrow record:', error);
        throw error;
    }

    // 更新图书状态为已借出
    await supabase
        .from('books')
        .update({ status: 'lent-out' })
        .eq('id', record.bookId);

    return {
        id: data.id,
        readerName: data.reader_name,
        readerId: data.reader_id,
        readerAvatar: data.reader_avatar || undefined,
        borrowDate: new Date(data.borrow_date).toLocaleDateString('zh-CN'),
        dueDate: new Date(data.due_date).toLocaleDateString('zh-CN'),
        returnDate: data.return_date ? new Date(data.return_date).toLocaleDateString('zh-CN') : undefined,
        status: data.status as BorrowRecord['status'],
    };
};

/**
 * 归还图书（更新借阅记录）
 */
export const returnBook = async (recordId: string): Promise<void> => {
    const { error } = await supabase
        .from('borrow_records')
        .update({
            status: 'returned',
            return_date: new Date().toISOString(),
        })
        .eq('id', recordId);

    if (error) {
        console.error('Error returning book:', error);
        throw error;
    }
};

/**
 * 获取统计数据
 */
export const getStats = async () => {
    // 获取图书总数
    const { count: totalBooks } = await supabase
        .from('books')
        .select('*', { count: 'exact', head: true });

    // 获取活跃借阅数
    const { count: activeBorrows } = await supabase
        .from('borrow_records')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

    // 获取逾期图书数
    const { count: overdueBooks } = await supabase
        .from('borrow_records')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'overdue');

    // 获取本月新增读者数
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const { count: newReaders } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('registration_date', oneMonthAgo.toISOString());

    return {
        totalBooks: totalBooks || 0,
        activeBorrows: activeBorrows || 0,
        overdueBooks: overdueBooks || 0,
        newReaders: newReaders || 0,
    };
};
