import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// 请将这些值替换为你的实际 Supabase 项目配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (自动从数据库架构生成)
export type BookStatus = 'in-library' | 'lent-out' | 'lost';
export type UserStatus = 'normal' | 'suspended';
export type BorrowRecordStatus = 'active' | 'returned' | 'overdue';

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string;
          title: string;
          author: string;
          isbn: string;
          status: BookStatus;
          cover_url: string | null;
          description: string | null;
          publisher: string | null;
          year: string | null;
          pages: number;
          language: string;
          location: string | null;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          author: string;
          isbn: string;
          status?: BookStatus;
          cover_url?: string | null;
          description?: string | null;
          publisher?: string | null;
          year?: string | null;
          pages?: number;
          language?: string;
          location?: string | null;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          author?: string;
          isbn?: string;
          status?: BookStatus;
          cover_url?: string | null;
          description?: string | null;
          publisher?: string | null;
          year?: string | null;
          pages?: number;
          language?: string;
          location?: string | null;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          registration_date: string;
          active_borrow_count: number;
          status: UserStatus;
          avatar_initials: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          registration_date?: string;
          active_borrow_count?: number;
          status?: UserStatus;
          avatar_initials?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          registration_date?: string;
          active_borrow_count?: number;
          status?: UserStatus;
          avatar_initials?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      borrow_records: {
        Row: {
          id: string;
          book_id: string;
          user_id: string;
          reader_name: string;
          reader_id: string;
          reader_avatar: string | null;
          borrow_date: string;
          due_date: string;
          return_date: string | null;
          status: BorrowRecordStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          book_id: string;
          user_id: string;
          reader_name: string;
          reader_id: string;
          reader_avatar?: string | null;
          borrow_date?: string;
          due_date: string;
          return_date?: string | null;
          status?: BorrowRecordStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          book_id?: string;
          user_id?: string;
          reader_name?: string;
          reader_id?: string;
          reader_avatar?: string | null;
          borrow_date?: string;
          due_date?: string;
          return_date?: string | null;
          status?: BorrowRecordStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
