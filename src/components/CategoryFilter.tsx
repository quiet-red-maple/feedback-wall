import React from 'react';
import { ThemeDirection, useFeedbackStore } from '../store/useFeedbackStore';
import { useTranslation } from 'react-i18next';

export const CategoryFilter: React.FC = () => {
  const activeTheme = useFeedbackStore((state) => state.activeTheme);
  const setActiveTheme = useFeedbackStore((state) => state.setActiveTheme);
  const themeMode = useFeedbackStore((state) => state.themeMode);
  const { t } = useTranslation();

  const categories: { id: ThemeDirection | 'all'; labelKey: string }[] = [
    { id: 'all', labelKey: 'categories.all' },
    { id: 'hard_to_use', labelKey: 'categories.hard_to_use' },
    { id: 'broken', labelKey: 'categories.broken' },
    { id: 'too_slow', labelKey: 'categories.too_slow' },
    { id: 'new_idea', labelKey: 'categories.new_idea' },
    { id: 'praise', labelKey: 'categories.praise' },
    { id: 'other', labelKey: 'categories.other' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveTheme(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border ${
            activeTheme === category.id
              ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] border-violet-500'
              : themeMode === 'dark'
                ? 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border-zinc-800'
                : 'bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 border-zinc-200 shadow-sm'
          }`}
        >
          {t(category.labelKey)}
        </button>
      ))}
    </div>
  );
};
