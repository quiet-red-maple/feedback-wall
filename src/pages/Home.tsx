import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Search } from 'lucide-react';
import { useFeedbackStore } from '../store/useFeedbackStore';
import { Header } from '../components/Header';
import { CategoryFilter } from '../components/CategoryFilter';
import { FeedbackCard } from '../components/FeedbackCard';
import { useTranslation } from 'react-i18next';

export const Home: React.FC = () => {
  const feedbacks = useFeedbackStore((state) => state.feedbacks);
  const activeTheme = useFeedbackStore((state) => state.activeTheme);
  const searchQuery = useFeedbackStore((state) => state.searchQuery);
  const setSearchQuery = useFeedbackStore((state) => state.setSearchQuery);
  const themeMode = useFeedbackStore((state) => state.themeMode);
  const { t } = useTranslation();

  const filteredFeedbacks = useMemo(() => {
    let result = feedbacks;
    if (activeTheme !== 'all') {
      result = result.filter(f => f.theme === activeTheme);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.product.toLowerCase().includes(query) ||
        f.title.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query)
      );
    }
    return [...result].sort((a, b) => b.upvotes - a.upvotes);
  }, [feedbacks, activeTheme, searchQuery]);

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 ${
      themeMode === 'dark' 
        ? 'bg-[#0D0D12] text-zinc-300 selection:bg-violet-500/30 selection:text-violet-200' 
        : 'bg-zinc-50 text-zinc-800 selection:bg-violet-500/20 selection:text-violet-900'
    }`}>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <section className="mb-12">
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 transition-colors duration-500 ${themeMode === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            {t('home.hero_title_1')}<br />
            {t('home.hero_title_2')}
          </h2>
          <p className={`text-lg max-w-2xl leading-relaxed mb-8 transition-colors duration-500 ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t('home.hero_desc')}
          </p>
          
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 transition-colors duration-500 ${themeMode === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`block w-full pl-11 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all backdrop-blur-xl ${
                themeMode === 'dark'
                  ? 'bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder-zinc-500'
                  : 'bg-white/80 border-zinc-200 text-zinc-900 placeholder-zinc-400 shadow-sm'
              }`}
              placeholder={t('home.search_placeholder')}
            />
          </div>
        </section>

        <p className="text-sm font-medium text-zinc-500 mb-2">{t('home.filter_title')}</p>
        <CategoryFilter />

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold flex items-center gap-2 transition-colors duration-500 ${themeMode === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
              {t('home.hot_title')}
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-500 ${
                themeMode === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-200 text-zinc-600'
              }`}>
                {filteredFeedbacks.length}
              </span>
            </h3>
            <span className={`text-sm transition-colors duration-500 ${themeMode === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{t('home.sort_by')}</span>
          </div>
          
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback, index) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} index={index} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-dashed transition-colors duration-500 ${
                    themeMode === 'dark' 
                      ? 'bg-zinc-900/30 border-zinc-800/50' 
                      : 'bg-zinc-50/50 border-zinc-300'
                  }`}
                >
                  <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    themeMode === 'dark' ? 'bg-zinc-800/50' : 'bg-zinc-200/50'
                  }`}>
                    <MessageSquare className="w-8 h-8 text-zinc-500" />
                  </div>
                  <p className={`font-medium transition-colors duration-500 ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {t('home.empty_state')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {themeMode === 'dark' && (
        <>
          <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-violet-900/10 via-[#0D0D12]/50 to-transparent pointer-events-none -z-10"></div>
          <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none -z-10"></div>
          <div className="fixed top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none -z-10"></div>
        </>
      )}
      {themeMode === 'light' && (
        <>
          <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-violet-500/5 via-zinc-50/50 to-transparent pointer-events-none -z-10"></div>
          <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none -z-10"></div>
          <div className="fixed top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[100px] pointer-events-none -z-10"></div>
        </>
      )}
    </div>
  );
};
