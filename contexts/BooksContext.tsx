
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../types';
import { getAllBooks, getBookById as fetchBookById, addBook as createBook } from '../services/dataService';

interface BooksContextType {
  books: Book[];
  loading: boolean;
  addBook: (book: Omit<Book, 'id' | 'status' | 'pages' | 'language'>) => Promise<void>;
  getBookById: (id: string) => Book | undefined;
  refreshBooks: () => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // 从 Supabase 加载图书数据
  const loadBooks = async () => {
    try {
      setLoading(true);
      const fetchedBooks = await getAllBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Failed to load books:', error);
      // 如果加载失败，可以选择使用 mock 数据作为备用
      // setBooks(MOCK_BOOKS);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadBooks();
  }, []);

  // 添加新图书
  const addBook = async (newBookData: Omit<Book, 'id' | 'status' | 'pages' | 'language'>) => {
    try {
      const newBook = await createBook(newBookData);
      setBooks((prevBooks) => [newBook, ...prevBooks]);
    } catch (error) {
      console.error('Failed to add book:', error);
      throw error;
    }
  };

  // 根据 ID 获取图书
  const getBookById = (id: string) => {
    return books.find((b) => b.id === id);
  };

  // 刷新图书列表
  const refreshBooks = async () => {
    await loadBooks();
  };

  return (
    <BooksContext.Provider value={{ books, loading, addBook, getBookById, refreshBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};
