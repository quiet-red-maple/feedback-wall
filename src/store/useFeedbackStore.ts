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
  
  // Local state actions
  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'upvotes' | 'hasUpvoted' | 'createdAt' | 'comments'>) => Promise<void>;
  toggleUpvote: (id: string) => Promise<void>;
  addComment: (feedbackId: string, content: string) => Promise<void>;
  setActiveTheme: (theme: ThemeDirection | 'all') => void;
  setSearchQuery: (query: string) => void;
  toggleThemeMode: () => void;

  // Supabase async actions
  fetchFeedbacks: () => Promise<void>;
}

const initialData: FeedbackItem[] = [
  {
    id: '1',
    product: '微信',
    title: '提供深色模式自动跟随系统切换',
    description: '目前需要手动在设置里切换深色和浅色模式，希望能增加一个"跟随系统"的选项，这样晚上用起来就不会那么刺眼了。',
    type: 'feature',
    theme: 'new_idea',
    upvotes: 245,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    author: '夜行侠',
    comments: [
      {
        id: 'c1',
        author: '产品汪',
        content: '这个需求确实很多人提，我们考虑在下个版本加入。',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
      }
    ]
  },
  {
    id: '2',
    product: '淘宝',
    title: '列表页加载速度太慢了！',
    description: '每次进入数据列表页面都要转圈等好几秒，特别是在移动端网络不太好的时候，体验极差，建议做一下数据分页或者骨架屏优化。',
    type: 'complaint',
    theme: 'too_slow',
    upvotes: 182,
    hasUpvoted: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    author: '急性子产品',
    comments: []
  },
  {
    id: '3',
    product: '知乎',
    title: '提交表单偶尔会丢失数据',
    description: '填了半天的长表单，如果不小心点到旁边关掉弹窗，数据就全没了！能不能加个草稿保存或者二次确认功能？',
    type: 'complaint',
    theme: 'broken',
    upvotes: 310,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    author: '受伤的运营',
    comments: []
  },
  {
    id: '4',
    product: '苹果手机',
    title: '导出的PDF排版错乱',
    description: '在使用报表导出功能时，PDF文件里的图表和文字重叠在一起了，完全没法看，希望能尽快修复。',
    type: 'complaint',
    theme: 'broken',
    upvotes: 56,
    hasUpvoted: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    author: '数据分析喵',
    comments: []
  }
];

export const useFeedbackStore = create<AppState>((set) => ({
  feedbacks: [],
  activeTheme: 'all',
  searchQuery: '',
  themeMode: 'dark',
  isLoading: false,
  error: null,
  /* 
  // --- Local Actions 备份 ---
  addFeedback: (feedback) => set((state) => ({
    feedbacks: [
      ...state.feedbacks,
      {
        ...feedback,
        id: Math.random().toString(36).substring(2, 9),
        upvotes: 0,
        hasUpvoted: false,
        createdAt: new Date().toISOString(),
        comments: []
      }
    ]
  })),
  toggleUpvote: (id) => set((state) => ({
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
  })),
  addComment: (feedbackId, content) => set((state) => ({
    feedbacks: state.feedbacks.map(f => {
      if (f.id === feedbackId) {
        return {
          ...f,
          comments: [
            ...f.comments,
            {
              id: Math.random().toString(36).substring(2, 9),
              author: '热心路人',
              content,
              createdAt: new Date().toISOString()
            }
          ]
        };
      }
      return f;
    })
  })),
  */

  // --- Supabase Async Actions ---
  fetchFeedbacks: async () => {
    set({ isLoading: true, error: null });
    try {
      const { feedbackService } = await import('../services/feedbackService');
      const data = await feedbackService.getFeedbacks();
      set({ feedbacks: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
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
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  toggleUpvote: async (id: string) => {
    const state = useFeedbackStore.getState();
    const targetFeedback = state.feedbacks.find(f => f.id === id);
    if (!targetFeedback) return;

    // 乐观更新 UI
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
    } catch (error: any) {
      // 失败则回滚 UI
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
    } catch (error: any) {
      console.error('Failed to add comment:', error);
    }
  },

  setActiveTheme: (theme) => set({ activeTheme: theme }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleThemeMode: () => set((state) => ({ themeMode: state.themeMode === 'dark' ? 'light' : 'dark' })),
}));
