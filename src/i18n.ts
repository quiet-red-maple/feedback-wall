import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      header: {
        title: '产品批斗大会',
        subtitle: '大型人类早期驯服智障产品珍贵录像',
        submit: '我要上台',
        cancel: '取消',
        language: 'EN'
      },
      home: {
        hero_title_1: '每一次激情开麦，',
        hero_title_2: '都是产品经理掉头发的动力。',
        hero_desc: '把你们在生活里吃过的屎、踩过的坑全喷出来吧！只要骂的人够多，咱们就拉产品经理出来祭天。至于解不解决……那得看产品经理的头发还剩多少（bushi）。',
        search_placeholder: '搜一搜哪个倒霉蛋被骂得最惨...',
        filter_title: '给这帮产品定个罪：',
        hot_title: '高赞惨案现场',
        sort_by: '吃瓜群众都在顶',
        empty_state: '居然没人开喷？这不科学！快来打响第一枪！'
      },
      categories: {
        all: '吃瓜大厅',
        hard_to_use: '反人类设计',
        broken: '动不动就崩',
        too_slow: '卡成PPT',
        new_idea: '做个白日梦',
        other: '纯属泄愤'
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
        product_label: '哪个倒霉产品惹到你了？',
        product_optional: '(选填)',
        product_placeholder: '如：微信、那个破打卡软件...',
        summary_label: '用一句狠话总结',
        summary_placeholder: '如：这破按钮藏得比我私房钱还深',
        desc_label: '展开说说你的怨气（或脑洞）',
        desc_placeholder: '别收敛，尽情发挥，大伙儿就爱看这种！',
        submit_btn: '发射！让产品经理颤抖吧 🚀'
      }
    }
  },
  en: {
    translation: {
      header: {
        title: 'Roast The Product',
        subtitle: 'Where bad UX comes to die',
        submit: 'Take the Mic',
        cancel: 'Cancel',
        language: '中'
      },
      home: {
        hero_title_1: 'Every angry rant',
        hero_title_2: 'costs a PM some hair.',
        hero_desc: 'Spill the tea on all the terrible products that made you suffer! If enough people complain, we might sacrifice a PM. Will it get fixed? Depends on their remaining hairline (jk).',
        search_placeholder: 'Search for the most roasted victim...',
        filter_title: 'Convict these products:',
        hot_title: 'Top Crime Scenes',
        sort_by: 'Sorted by upvotes',
        empty_state: 'Nobody is roasting? Unbelievable! Fire the first shot!'
      },
      categories: {
        all: 'All Drama',
        hard_to_use: 'Anti-Human UX',
        broken: 'Crash City',
        too_slow: 'Slower than Sloth',
        new_idea: 'Daydreaming',
        other: 'Pure Rage'
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
        product_label: 'Which poor product provoked you?',
        product_optional: '(Optional)',
        product_placeholder: 'e.g. WeChat, that stupid clock-in app...',
        summary_label: 'One savage sentence summary',
        summary_placeholder: 'e.g. This button is hidden deeper than my secret stash',
        desc_label: 'Unleash your rage (or ideas)',
        desc_placeholder: 'Don\'t hold back, go wild! We love the drama!',
        submit_btn: 'Launch! Make the PMs tremble 🚀'
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