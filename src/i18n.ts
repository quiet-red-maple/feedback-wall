import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      header: {
        title: '生活吐槽墙',
        subtitle: '任何离谱瞬间都值得被点赞',
        submit: '我要上台',
        cancel: '取消',
        language: 'EN'
      },
      home: {
        hero_title_1: '每一次激情开麦，',
        hero_title_2: '都是生活经验值 +1。',
        hero_desc: '工作、学习、通勤、社交、租房、外卖，任何让你上头的事都可以发。吐槽也好、建议也好，大家一起点赞共鸣。',
        search_placeholder: '搜一搜你关心的话题...',
        filter_title: '按类型筛选：',
        hot_title: '高赞惨案现场',
        sort_by: '吃瓜群众都在顶',
        empty_state: '居然没人开喷？这不科学！快来打响第一枪！'
      },
      categories: {
        all: '吃瓜大厅',
        hard_to_use: '很反人类',
        broken: '离谱翻车',
        too_slow: '拖延到爆',
        new_idea: '灵感来了',
        praise: '值得夸夸',
        other: '其他吐槽'
      },
      card: {
        complaint: '愤怒开喷',
        feature: '脑洞大开',
        comments: '人在吃瓜',
        from: '来自',
        today: '今天',
        yesterday: '昨天',
        days_ago: '天前',
        comment_placeholder: '键盘交给你，请开始你的表演...'
      },
      submit: {
        title: '请拿好你的麦克风 🎤',
        type_label: '今天是来发飙的，还是来许愿的？',
        type_complaint: '气死我了，开喷！',
        type_feature: '有个好点子',
        theme_label: '给它定个性：',
        product_label: '这是关于什么话题/场景？',
        product_optional: '(选填)',
        product_placeholder: '如：早高峰地铁、公司周会、外卖超时、室友作息...',
        summary_label: '用一句狠话总结',
        summary_placeholder: '如：这破按钮藏得比我私房钱还深',
        desc_label: '展开说说你的怨气（或脑洞）',
        desc_placeholder: '别收敛，尽情发挥，大伙儿就爱看这种！',
        submit_btn: '发射！让全网来评评理 🚀'
      }
    }
  },
  en: {
    translation: {
      header: {
        title: 'Life Roast Wall',
        subtitle: 'Rant, relate, and upvote real-life pain points',
        submit: 'Take the Mic',
        cancel: 'Cancel',
        language: '中'
      },
      home: {
        hero_title_1: 'Every angry rant',
        hero_title_2: 'adds +1 life wisdom.',
        hero_desc: 'From work and commute to rent, food delivery, and social chaos: post any real-life complaint or idea. Let people upvote what truly resonates.',
        search_placeholder: 'Search topics or situations...',
        filter_title: 'Filter by type:',
        hot_title: 'Top Crime Scenes',
        sort_by: 'Sorted by upvotes',
        empty_state: 'Nobody is roasting? Unbelievable! Fire the first shot!'
      },
      categories: {
        all: 'All Drama',
        hard_to_use: 'Painful to Use',
        broken: 'Total Trainwreck',
        too_slow: 'Painfully Slow',
        new_idea: 'Fresh Idea',
        praise: 'Shout-out',
        other: 'Other Rants'
      },
      card: {
        complaint: 'Furious Roast',
        feature: 'Wild Idea',
        comments: 'eating popcorn',
        from: 'From',
        today: 'Today',
        yesterday: 'Yesterday',
        days_ago: 'days ago',
        comment_placeholder: 'The keyboard is yours, start the show...'
      },
      submit: {
        title: 'Take the mic 🎤',
        type_label: 'Are you here to rage or to wish?',
        type_complaint: 'I am furious, let me roast!',
        type_feature: 'Got a brilliant idea',
        theme_label: 'Categorize the crime:',
        product_label: 'What topic/situation is this about?',
        product_optional: '(Optional)',
        product_placeholder: 'e.g. rush-hour subway, weekly standup, delayed delivery...',
        summary_label: 'One savage sentence summary',
        summary_placeholder: 'e.g. This button is hidden deeper than my secret stash',
        desc_label: 'Unleash your rage (or ideas)',
        desc_placeholder: 'Don\'t hold back, go wild! We love the drama!',
        submit_btn: 'Launch! Let the crowd decide 🚀'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
