const translations = {
  en: {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter'
    },
    dashboard: {
      title: 'Dashboard',
      projects: 'Projects',
      tasks: 'Tasks',
      notifications: 'Notifications',
      analytics: 'Analytics'
    },
    projects: {
      title: 'Projects',
      create: 'Create Project',
      name: 'Project Name',
      description: 'Description',
      budget: 'Budget',
      status: 'Status',
      startDate: 'Start Date',
      endDate: 'End Date'
    }
  },
  ms: {
    common: {
      loading: 'Memuatkan...',
      save: 'Simpan',
      cancel: 'Batal',
      delete: 'Padam',
      edit: 'Edit',
      search: 'Cari',
      filter: 'Tapis'
    },
    dashboard: {
      title: 'Papan Pemuka',
      projects: 'Projek',
      tasks: 'Tugasan',
      notifications: 'Pemberitahuan',
      analytics: 'Analitik'
    },
    projects: {
      title: 'Projek',
      create: 'Cipta Projek',
      name: 'Nama Projek',
      description: 'Penerangan',
      budget: 'Bajet',
      status: 'Status',
      startDate: 'Tarikh Mula',
      endDate: 'Tarikh Tamat'
    }
  },
  zh: {
    common: {
      loading: '加载中...',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      edit: '编辑',
      search: '搜索',
      filter: '筛选'
    },
    dashboard: {
      title: '仪表板',
      projects: '项目',
      tasks: '任务',
      notifications: '通知',
      analytics: '分析'
    },
    projects: {
      title: '项目',
      create: '创建项目',
      name: '项目名称',
      description: '描述',
      budget: '预算',
      status: '状态',
      startDate: '开始日期',
      endDate: '结束日期'
    }
  }
};

class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }

  t(key) {
    const keys = key.split('.');
    let value = translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }

  formatCurrency(amount, currency = 'MYR') {
    const locale = {
      en: 'en-MY',
      ms: 'ms-MY',
      zh: 'zh-CN'
    }[this.currentLanguage] || 'en-MY';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount);
  }

  formatDate(date) {
    const locale = {
      en: 'en-MY',
      ms: 'ms-MY',
      zh: 'zh-CN'
    }[this.currentLanguage] || 'en-MY';

    return new Intl.DateTimeFormat(locale).format(new Date(date));
  }
}

export default new I18n();