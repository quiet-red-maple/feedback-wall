import { supabase } from '../lib/supabase';
import type { FeedbackItem, Comment } from '../store/useFeedbackStore';

// Note: Ensure you have created `feedbacks` and `comments` tables in your Supabase project.

export const feedbackService = {
  /**
   * 获取所有反馈列表
   */
  async getFeedbacks(): Promise<FeedbackItem[]> {
    const { data, error } = await supabase
      .from('feedbacks')
      .select(`
        *,
        comments (*)
      `)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching feedbacks:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * 添加新反馈
   */
  async addFeedback(feedback: Omit<FeedbackItem, 'id' | 'upvotes' | 'hasUpvoted' | 'createdAt' | 'comments'>) {
    const { data, error } = await supabase
      .from('feedbacks')
      .insert([{
        ...feedback,
        upvotes: 0,
        hasUpvoted: false,
        createdAt: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding feedback:', error);
      throw error;
    }

    return data;
  },

  /**
   * 切换点赞状态
   * 实际项目中，点赞通常需要一个独立的表来记录用户与反馈的点赞关系
   */
  async toggleUpvote(id: string, currentUpvotes: number, currentlyUpvoted: boolean) {
    const newUpvotes = currentlyUpvoted ? currentUpvotes - 1 : currentUpvotes + 1;
    
    const { data, error } = await supabase
      .from('feedbacks')
      .update({ 
        upvotes: newUpvotes,
        hasUpvoted: !currentlyUpvoted 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating upvote:', error);
      throw error;
    }

    return data;
  },

  /**
   * 添加评论
   */
  async addComment(feedbackId: string, content: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        feedback_id: feedbackId,
        author: '热心路人', // 实际项目中应使用当前登录用户
        content,
        createdAt: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding comment:', error);
      throw error;
    }

    return data;
  }
};
