import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flame, Mic, Moon, Sun, X, Languages } from 'lucide-react';
import { useFeedbackStore } from '../store/useFeedbackStore';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const themeMode = useFeedbackStore((state) => state.themeMode);
  const toggleThemeMode = useFeedbackStore((state) => state.toggleThemeMode);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('zh') ? 'en' : 'zh');
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b w-full mb-8 shadow-sm transition-colors duration-500 ${
      themeMode === 'dark' 
        ? 'bg-[#0D0D12]/80 border-zinc-800/80' 
        : 'bg-white/80 border-zinc-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold tracking-tight transition-colors duration-500 ${themeMode === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
              {t('header.title')}
            </h1>
            <p className={`text-xs font-medium transition-colors duration-500 ${themeMode === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {t('header.subtitle')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs transition-all duration-300 ${
              themeMode === 'dark' 
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white' 
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
            }`}
            title="Switch Language"
          >
            {t('header.language')}
          </button>
          
          <button
            onClick={toggleThemeMode}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              themeMode === 'dark' 
                ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200' 
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
            }`}
          >
            {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {location.pathname === '/' ? (
            <button
              onClick={() => navigate('/submit')}
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 active:scale-95 ${
                themeMode === 'dark'
                  ? 'bg-zinc-100 text-zinc-900 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:scale-105'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>{t('header.submit')}</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 active:scale-95 ${
                themeMode === 'dark'
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:scale-105'
                  : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300 hover:text-zinc-900 shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:scale-105'
              }`}
            >
              <X className="w-4 h-4" />
              <span>{t('header.cancel')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
