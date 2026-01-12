
export type BookStatus = 'in-library' | 'lent-out' | 'lost';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: BookStatus;
  coverUrl: string;
  description: string;
  publisher: string;
  year: string;
  pages: number;
  language: string;
  location: string;
  category: string;
}

export interface BorrowRecord {
  id: string;
  readerName: string;
  readerId: string;
  readerAvatar?: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'returned' | 'overdue' | 'active';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  activeBorrowCount: number;
  status: 'normal' | 'suspended';
  avatarInitials: string;
}

export interface Stats {
  totalBooks: number;
  activeBorrows: number;
  overdueBooks: number;
  newReaders: number;
}
