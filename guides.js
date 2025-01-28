// Theme toggling
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-btn i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Language toggling
function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    
    const langBtn = document.querySelector('.lang-btn span');
    if (langBtn) {
        langBtn.textContent = newLang.toUpperCase();
    }
    
    translateContent(newLang);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Set saved language
    const savedLang = localStorage.getItem('language') || 'ar';
    document.documentElement.setAttribute('lang', savedLang);
    const langBtn = document.querySelector('.lang-btn span');
    if (langBtn) {
        langBtn.textContent = savedLang.toUpperCase();
    }
});

// Translations
const translations = {
    ar: {
        'virus-guide': 'دليل الفيروسات',
        'hacked-accounts-guide': 'دليل الحسابات المخترقة',
        'bank-security-guide': 'دليل أمان البنوك',
        'view-guide': 'عرض الدليل'
    },
    en: {
        'virus-guide': 'Virus Guide',
        'hacked-accounts-guide': 'Hacked Accounts Guide',
        'bank-security-guide': 'Bank Security Guide',
        'view-guide': 'View Guide'
    }
};

function translateContent(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
} 