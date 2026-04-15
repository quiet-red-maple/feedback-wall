import { create } from 'zustand';

export type FeedbackType = 'complaint' | 'feature';
export type ThemeDirection = 'hard_to_use' | 'broken' | 'too_slow' | 'new_idea' | 'other';

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface FeedbackItem {
  id: string;
  product: string;
  title: string;
  description: string;
  type: FeedbackType;
  theme: ThemeDirection;
  upvotes: number;
  hasUpvoted: boolean;
  createdAt: string;
  author: string;
  comments: Comment[];
}

interface AppState {
  feedbacks: FeedbackItem[];
  activeTheme: ThemeDirection | 'all';
  searchQuery: string;
  themeMode: 'dark' | 'light';
  isLoading: boolean;
  error: string | null;

  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'upvotes' | 'hasUpvoted' | 'createdAt' | 'comments'>) => Promise<void>;
  toggleUpvote: (id: string) => Promise<void>;
  addComment: (feedbackId: string, content: string) => Promise<void>;
  setActiveTheme: (theme: ThemeDirection | 'all') => void;
  setSearchQuery: (query: string) => void;
  toggleThemeMode: () => void;

  fetchFeedbacks: () => Promise<void>;
}

export const useFeedbackStore = create<AppState>((set) => ({
  feedbacks: [],
  activeTheme: 'all',
  searchQuery: '',
  themeMode: 'dark',
  isLoading: false,
  error: null,
  fetchFeedbacks: async () => {
    set({ isLoading: true, error: null });
    try {
      const { feedbackService } = await import('../services/feedbackService');
      const data = await feedbackService.getFeedbacks();
      set({ feedbacks: data, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      set({ error: message, isLoading: false });
    }
  },

  addFeedback: async (feedback) => {
    set({ isLoading: true, error: null });
    try {
      const { feedbackService } = await import('../services/feedbackService');
      const newFeedback = await feedbackService.addFeedback(feedback);
      set((state) => ({ 
        feedbacks: [{ ...newFeedback, comments: [] }, ...state.feedbacks],
        isLoading: false 
      }));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      set({ error: message, isLoading: false });
    }
  },

  toggleUpvote: async (id: string) => {
    const state = useFeedbackStore.getState();
    const targetFeedback = state.feedbacks.find(f => f.id === id);
    if (!targetFeedback) return;

    set((state) => ({
      feedbacks: state.feedbacks.map(f => {
        if (f.id === id) {
          return {
            ...f,
            hasUpvoted: !f.hasUpvoted,
            upvotes: f.hasUpvoted ? f.upvotes - 1 : f.upvotes + 1
          };
        }
        return f;
      })
    }));

    try {
      const { feedbackService } = await import('../services/feedbackService');
      await feedbackService.toggleUpvote(id, targetFeedback.upvotes, targetFeedback.hasUpvoted);
    } catch (error: unknown) {
      console.error('Failed to toggle upvote:', error);
      set((state) => ({
        feedbacks: state.feedbacks.map(f => {
          if (f.id === id) {
            return {
              ...f,
              hasUpvoted: targetFeedback.hasUpvoted,
              upvotes: targetFeedback.upvotes
            };
          }
          return f;
        })
      }));
    }
  },

  addComment: async (feedbackId: string, content: string) => {
    try {
      const { feedbackService } = await import('../services/feedbackService');
      const newComment = await feedbackService.addComment(feedbackId, content);
      
      set((state) => ({
        feedbacks: state.feedbacks.map(f => {
          if (f.id === feedbackId) {
            return {
              ...f,
              comments: [...f.comments, newComment]
            };
          }
          return f;
        })
      }));
    } catch (error: unknown) {
      console.error('Failed to add comment:', error);
    }
  },

  setActiveTheme: (theme) => set({ activeTheme: theme }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleThemeMode: () => set((state) => ({ themeMode: state.themeMode === 'dark' ? 'light' : 'dark' })),
}));
