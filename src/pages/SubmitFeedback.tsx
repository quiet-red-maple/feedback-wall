import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, Send } from 'lucide-react';
import { useFeedbackStore, FeedbackType, ThemeDirection } from '../store/useFeedbackStore';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';

export const SubmitFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { addFeedback, themeMode } = useFeedbackStore();
  const { t } = useTranslation();
  
  const [type, setType] = useState<FeedbackType>('feature');
  const [theme, setTheme] = useState<ThemeDirection>('other');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    
    addFeedback({
      // Keep DB compatibility: `product` column now stores generic topic/context text.
      product: topic.trim(),
      title,
      description,
      type,
      theme,
      author: '匿名探险家'
    });
    
    navigate('/');
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 ${
      themeMode === 'dark' 
        ? 'bg-[#0D0D12] text-zinc-300 selection:bg-violet-500/30 selection:text-violet-200' 
        : 'bg-zinc-50 text-zinc-800 selection:bg-violet-500/20 selection:text-violet-900'
    }`}>
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-2xl shadow-xl border overflow-hidden ${
            themeMode === 'dark' 
              ? 'bg-[#111116] border-zinc-800/80' 
              : 'bg-white border-zinc-200'
          }`}
        >
          <div className={`p-6 border-b ${themeMode === 'dark' ? 'border-zinc-800/80' : 'border-zinc-100'}`}>
            <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${themeMode === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
              {t('submit.title')}
            </h2>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-3 ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  {t('submit.type_label')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType('complaint')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                      type === 'complaint'
                        ? 'bg-rose-500/10 border-rose-500/50 text-rose-400 ring-1 ring-rose-500/50'
                        : themeMode === 'dark'
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800/50'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100'
                    }`}
                  >
                    <AlertTriangle className="w-6 h-6 mb-2" />
                    <span className="font-semibold">{t('submit.type_complaint')}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setType('feature')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                      type === 'feature'
                        ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 ring-1 ring-amber-500/50'
                        : themeMode === 'dark'
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800/50'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100'
                    }`}
                  >
                    <Lightbulb className="w-6 h-6 mb-2" />
                    <span className="font-semibold">{t('submit.type_feature')}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  {t('submit.theme_label')}
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as ThemeDirection)}
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none border ${
                    themeMode === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-200'
                      : 'bg-white border-zinc-200 text-zinc-900 shadow-sm'
                  }`}
                >
                  <option value="hard_to_use">{t('categories.hard_to_use')}</option>
                  <option value="broken">{t('categories.broken')}</option>
                  <option value="too_slow">{t('categories.too_slow')}</option>
                  <option value="new_idea">{t('categories.new_idea')}</option>
                  <option value="praise">{t('categories.praise')}</option>
                  <option value="other">{t('categories.other')}</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 flex justify-between ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  <span>{t('submit.product_label')}</span>
                  <span className={themeMode === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}>{t('submit.product_optional')}</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t('submit.product_placeholder')}
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all border ${
                    themeMode === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600'
                      : 'bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 shadow-sm'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  {t('submit.summary_label')}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('submit.summary_placeholder')}
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all border ${
                    themeMode === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600'
                      : 'bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 shadow-sm'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  {t('submit.desc_label')}
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('submit.desc_placeholder')}
                  rows={4}
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none border ${
                    themeMode === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600'
                      : 'bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 shadow-sm'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={!title.trim() || !description.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-violet-600"
              >
                <Send className="w-4 h-4" />
                <span>{t('submit.submit_btn')}</span>
              </button>
            </form>
          </div>
        </motion.div>
      </main>

      {/* Background Decor */}
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
