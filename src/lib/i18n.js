// Internationalization utility for Malaysian Contractors Hub
// Simple i18n implementation to address JSX internationalization issues

const translations = {
  en: {
    // Common
    'loading': 'Loading...',
    'save': 'Save',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    'create': 'Create',
    'update': 'Update',
    
    // Navigation
    'dashboard': 'Dashboard',
    'projects': 'Projects',
    'services': 'Services',
    'marketplace': 'Marketplace',
    'compliance': 'Compliance',
    
    // Forms
    'email': 'Email',
    'password': 'Password',
    'name': 'Name',
    'description': 'Description',
    'location': 'Location',
    'budget': 'Budget',
    
    // Status
    'active': 'Active',
    'inactive': 'Inactive',
    'completed': 'Completed',
    'pending': 'Pending',
    'in_progress': 'In Progress'
  },
  ms: {
    // Common
    'loading': 'Memuatkan...',
    'save': 'Simpan',
    'cancel': 'Batal',
    'delete': 'Padam',
    'edit': 'Edit',
    'create': 'Cipta',
    'update': 'Kemaskini',
    
    // Navigation
    'dashboard': 'Papan Pemuka',
    'projects': 'Projek',
    'services': 'Perkhidmatan',
    'marketplace': 'Pasaran',
    'compliance': 'Pematuhan',
    
    // Forms
    'email': 'E-mel',
    'password': 'Kata Laluan',
    'name': 'Nama',
    'description': 'Penerangan',
    'location': 'Lokasi',
    'budget': 'Bajet',
    
    // Status
    'active': 'Aktif',
    'inactive': 'Tidak Aktif',
    'completed': 'Selesai',
    'pending': 'Menunggu',
    'in_progress': 'Dalam Proses'
  }
};

let currentLanguage = 'en';

export const setLanguage = (lang) => {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
};

export const getLanguage = () => {
  return currentLanguage || localStorage.getItem('language') || 'en';
};

export const t = (key) => {
  const lang = getLanguage();
  return translations[lang]?.[key] || translations.en[key] || key;
};

export default { t, setLanguage, getLanguage };