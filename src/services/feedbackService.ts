import { supabase } from '../lib/supabase';
import type { FeedbackItem } from '../store/useFeedbackStore';

export const feedbackService = {
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

  async addComment(feedbackId: string, content: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        feedback_id: feedbackId,
        author: '热心路人',
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
