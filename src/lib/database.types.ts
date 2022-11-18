export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          heading: string
          content: string
          author: string
          author_designation: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          heading: string
          content: string
          author: string
          author_designation?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          heading?: string
          content?: string
          author?: string
          author_designation?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

