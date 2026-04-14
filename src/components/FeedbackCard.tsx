import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, MessageSquare, AlertCircle, Sparkles, Send } from 'lucide-react';
import { FeedbackItem, useFeedbackStore } from '../store/useFeedbackStore';
import { useTranslation } from 'react-i18next';

const themeColors: Record<FeedbackItem['theme'], string> = {
  hard_to_use: 'text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20',
  too_slow: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  broken: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  new_idea: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  other: 'text-slate-400 bg-slate-400/10 border-slate-400/20'
};

interface Props {
  feedback: FeedbackItem;
  index: number;
}

export const FeedbackCard = React.forwardRef<HTMLDivElement, Props>(({ feedback, index }, ref) => {
  const { toggleUpvote, addComment, themeMode } = useFeedbackStore();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays < 1) {
      return t('card.today');
    } else if (diffDays < 2) {
      return t('card.yesterday');
    } else {
      return `${diffDays} ${t('card.days_ago')}`;
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(feedback.id, commentText);
    setCommentText('');
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      layout
      className={`group relative flex gap-4 p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 shadow-sm ${
        themeMode === 'dark'
          ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 shadow-black/20'
          : 'bg-white/80 border-zinc-200 hover:border-violet-200 hover:bg-white shadow-zinc-200/50'
      }`}
    >
      <div className="flex flex-col items-center gap-1 shrink-0">
        <button
          onClick={() => toggleUpvote(feedback.id)}
          className={`flex flex-col items-center justify-center w-12 h-16 rounded-xl transition-all duration-300 border ${
            feedback.hasUpvoted
              ? 'bg-violet-600/20 border-violet-500/50 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
              : themeMode === 'dark'
                ? 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                : 'bg-zinc-100 border-zinc-200 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800'
          }`}
        >
          <ChevronUp className={`w-5 h-5 mb-0.5 ${feedback.hasUpvoted ? 'stroke-[3px]' : 'stroke-2'}`} />
          <span className="text-sm font-semibold tracking-tight">{feedback.upvotes}</span>
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {feedback.product && (
              <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                [{feedback.product}]
              </span>
            )}
            <h3 className={`text-lg font-medium transition-colors line-clamp-1 ${
              themeMode === 'dark' 
                ? 'text-zinc-100 group-hover:text-violet-300' 
                : 'text-zinc-900 group-hover:text-violet-600'
            }`}>
              {feedback.title}
            </h3>
          </div>
          <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${themeColors[feedback.theme]}`}>
            {t(`categories.${feedback.theme}`)}
          </span>
        </div>
        
        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {feedback.description}
        </p>
        
        <div className={`flex items-center gap-4 text-xs font-medium ${themeMode === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
          <div className="flex items-center gap-1.5">
            {feedback.type === 'complaint' ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-500/80" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-500/80" />
            )}
            <span>{feedback.type === 'complaint' ? t('card.complaint') : t('card.feature')}</span>
          </div>
          
          <button 
            onClick={() => setIsCommentOpen(!isCommentOpen)}
            className="flex items-center gap-1.5 hover:text-violet-400 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{feedback.comments.length} {t('card.comments')}</span>
          </button>
          
          <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
          <span>{t('card.from')} {feedback.author}</span>
          
          <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
          <span>{formatDate(feedback.createdAt)}</span>
        </div>

        <AnimatePresence>
          {isCommentOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className={`mt-4 pt-4 border-t space-y-4 ${themeMode === 'dark' ? 'border-zinc-800/50' : 'border-zinc-200'}`}>
                {feedback.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${themeMode === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                      <span className={`text-xs font-medium ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {comment.author.slice(0, 1)}
                      </span>
                    </div>
                    <div className={`flex-1 rounded-2xl rounded-tl-sm px-4 py-3 border ${
                      themeMode === 'dark' 
                        ? 'bg-zinc-900/50 border-zinc-800/50' 
                        : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-medium ${themeMode === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>{comment.author}</span>
                        <span className="text-xs text-zinc-500">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className={`text-sm ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{comment.content}</p>
                    </div>
                  </div>
                ))}

                <form onSubmit={handleCommentSubmit} className="relative mt-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={t('card.comment_placeholder')}
                    className={`w-full rounded-xl pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all border ${
                      themeMode === 'dark'
                        ? 'bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600'
                        : 'bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:text-violet-500 disabled:opacity-50 transition-colors ${
                      themeMode === 'dark'
                        ? 'text-zinc-500 disabled:hover:text-zinc-500'
                        : 'text-zinc-400 disabled:hover:text-zinc-400'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:to-transparent pointer-events-none transition-all duration-500"></div>
    </motion.div>
  );
});

FeedbackCard.displayName = 'FeedbackCard';
