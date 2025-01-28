// التحقق من تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // استعادة الثيم المحفوظ
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const categoryCards = document.querySelectorAll('.category-main');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const subOptions = document.querySelectorAll(`.${category}-option`);
            
            // إخفاء جميع الخيارات الفرعية أولاً
            document.querySelectorAll('.sub-option').forEach(opt => {
                opt.classList.add('hidden');
            });
            
            // إزالة التأثير النشط من جميع الفئات
            document.querySelectorAll('.category-main').forEach(cat => {
                cat.classList.remove('active-category');
            });
            
            // إظهار الخيارات الفرعية للفئة المحددة
            subOptions.forEach(opt => {
                opt.classList.remove('hidden');
            });
            
            // إضهار زر الإغلاق
            closeMenuBtn.classList.remove('hidden');
            
            // إضافة التأثير النشط للفئة المحددة
            this.classList.add('active-category');
        });
    });

    // إضافة وظيفة زر الإغلاق
    closeMenuBtn.addEventListener('click', function() {
        // إخفاء جميع الخيارات الفرعية
        document.querySelectorAll('.sub-option').forEach(opt => {
            opt.classList.add('hidden');
        });
        
        // إزالة التأثير النشط من جميع الفئات
        document.querySelectorAll('.category-main').forEach(cat => {
            cat.classList.remove('active-category');
        });
        
        // إخفاء زر الإغلاق
        this.classList.add('hidden');
    });

    // Log for debugging
    console.log('Initializing language');
    
    const savedLang = localStorage.getItem('language') || 'ar';
    document.documentElement.setAttribute('lang', savedLang);
    
    const translateBtn = document.getElementById('translateBtn');
    if (translateBtn) {
        const span = translateBtn.querySelector('span');
        if (span) {
            span.textContent = savedLang.toUpperCase();
        }
    }
    
    translateContent(savedLang);

    // Fix for link scanner
    const scanButton = document.querySelector('.links-content .check-btn');
    const linkInput = document.querySelector('.links-content input[type="url"]');
    
    if (scanButton && linkInput) {
        scanButton.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Remove any existing result
            const existingResult = linkInput.parentElement.querySelector('.scan-result');
            if (existingResult) {
                existingResult.remove();
            }

            // Disable input and button while scanning
            linkInput.disabled = true;
            scanButton.disabled = true;
            scanButton.textContent = document.documentElement.lang === 'ar' ? 'جاري الفحص...' : 'Scanning...';

            const result = await scanLink(linkInput.value);

            // Create result element
            const resultDiv = document.createElement('div');
            resultDiv.className = `scan-result ${result.safe ? 'safe' : 'unsafe'}`;
            resultDiv.textContent = result.message;

            // Add result after the input group
            linkInput.parentElement.appendChild(resultDiv);

            // Re-enable input and button
            linkInput.disabled = false;
            scanButton.disabled = false;
            scanButton.textContent = document.documentElement.lang === 'ar' ? 'فحص الرابط' : 'Check Link';
        });
    }

    // Clear any previous results
    const existingResults = document.querySelectorAll('.scan-result');
    existingResults.forEach(result => result.remove());
});

// دالة تبديل الثيم
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
}

// تحديث أيقونة الثيم
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-btn i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem('sanadUserData');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const toolContents = document.querySelectorAll('.tool-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            item.classList.add('active');

            // Hide all tool contents
            toolContents.forEach(content => content.classList.add('hidden'));

            // Show the corresponding tool content
            const category = item.dataset.category;
            const targetContent = document.querySelector(`.${category}-content`);
            targetContent.classList.remove('hidden');
        });
    });

    // Show first category by default
    navItems[0].click();
});

function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    
    // Update button text
    const langBtn = document.querySelector('.lang-btn span');
    if (langBtn) {
        langBtn.textContent = newLang.toUpperCase();
    }
    
    translateContent(newLang);
}

// Translation object
const translations = {
    ar: {
        // Navigation
        'links': 'الروابط',
        'files': 'الملفات',
        'numbers': 'الأرقام',
        'guides': 'الأدلة',
        'others': 'أخرى',
        'choose-file': 'اختر ملف',
        // Links section
        'suspicious-links': 'كاشف الروابط المشبوهة',
        'enter-suspicious-link': 'أدخل الرابط المشبوه هنا',
        'check-link': 'فحص الرابط',
        'bank-links': 'كاشف روابط البنوك',
        'enter-bank-link': 'أدخل رابط البنك للتحقق',
        'verify-link': 'تحقق من الرابط',
        
        // Files section
        'file-checker': 'فاحص الملفات',
        'check-file': 'فحص الملف',
        
        // Numbers section
        'verify-official-numbers': 'التحقق من الأرقام الرسمية',
        'enter-phone': 'أدخل رقم الهاتف',
        'verify-number': 'تحقق من الرقم',
        'report-suspicious-numbers': 'الإبلاغ عن الأرقام المشبوهة',
        'enter-suspicious-number': 'أدخل الرقم المشبوه',
        'report-details': 'تفاصيل البلاغ',
        'send-report': 'إرسال البلاغ',
        
        // Guides section
        'virus-guide': 'دليل الفيروسات',
        'hacked-accounts-guide': 'دليل الحسابات المخترقة',
        'bank-security-guide': 'دليل أمان البنوك',
        'view-guide': 'عرض الدليل',
        
        // Others section
        'meno-dag-partnership': 'شراكة منو داق',
        'company-name': 'اسم الشركة/الشخص',
        'partnership-details': 'تفاصيل الشراكة',
        'submit-request': 'تقديم الطلب',
        'dark-web-checker': 'فاحص الويب المظلم',
        'enter-email': 'أدخل البريد الإلكتروني',
        'check': 'فحص',
        'darkweb': 'الويب المظلم',
        'shop': 'المتجر',
        'report-details': 'تفاصيل البلاغ',
        'main': 'الرئيسية',
        'track-order': 'تتبع الطلبية',
        'enter-tracking-number': 'أدخل رقم التتبع',
        'track': 'تتبع',
        'tracking-status': 'حالة التتبع',
        'order-not-found': 'لم يتم العثور على الطلبية',
        'invalid-tracking': 'رقم التتبع غير صالح',
        'checking-status': 'جاري التحقق...',
        'last-update': 'آخر تحديث',
        'current-location': 'الموقع الحالي',
        'status': 'الحالة',
    },
    en: {
        // Navigation
        'links': 'Links',
        'files': 'Files',
        'numbers': 'Numbers',
        'guides': 'Guides',
        'others': 'Others',
        
        // Links section
        'choose-file': 'Choose File',
        'suspicious-links': 'Link Scanner',
        'enter-suspicious-link': 'Enter link',
        'check-link': 'Scan',
        'bank-links': 'Bank Link Scanner',
        'enter-bank-link': 'Enter bank link to verify',
        'verify-link': 'Verify Link',
        
        // Files section
        'file-checker': 'File Checker',
        'check-file': 'Check File',
        
        // Numbers section
        'verify-official-numbers': 'Verify Official Numbers',
        'enter-phone': 'Enter phone number',
        'verify-number': 'Verify Number',
        'report-suspicious-numbers': 'Report Suspicious Numbers',
        'enter-suspicious-number': 'Enter suspicious number',
        'report-details': 'Report Details',
        'send-report': 'Send Report',
        
        // Guides section
        'virus-guide': 'Virus Guide',
        'hacked-accounts-guide': 'Hacked Accounts Guide',
        'bank-security-guide': 'Bank Security Guide',
        'view-guide': 'View Guide',
        
        // Others section
        'meno-dag-partnership': 'Meno Dag Partnership',
        'company-name': 'Company/Person Name',
        'partnership-details': 'Partnership Details',
        'submit-request': 'Submit Request',
        'dark-web-checker': 'Dark Web Checker',
        'enter-email': 'Enter email',
        'check': 'Check',
        'darkweb': 'Dark Web',
        'shop': 'Shop',
        'report-details': 'Report Details',
        'main': 'Main',
        'track-order': 'Track Order',
        'tracking-status': 'Tracking Status',
        'order-not-found': 'Order not found',
        'invalid-tracking': 'Invalid tracking number',
        'checking-status': 'Checking status...',
        'last-update': 'Last Update',
        'current-location': 'Current Location',
        'status': 'Status',
    }
};

function translateContent(lang) {
    // Update text content for all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders for inputs
    document.querySelectorAll('input[data-translate-placeholder]').forEach(input => {
        const key = input.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });

    // Update button texts
    document.querySelectorAll('.check-btn').forEach(btn => {
        const key = btn.getAttribute('data-translate');
        if (translations[lang][key]) {
            btn.textContent = translations[lang][key];
        }
    });
}

document.getElementById('fileInput').addEventListener('change', function() {
    const fileName = this.files[0]?.name;
    const label = document.querySelector('.file-input-label');
    if (fileName) {
        label.textContent = fileName;
    } else {
        label.textContent = 'اختر ملف';
    }
});

// Add this constant at the top of your file
const VIRUSTOTAL_API_KEY = '29c59925d2a5a97f4c56bc244d3c95600ffd8d20742e0ab3992ba9cc6370f657';

async function scanLink() {
    const linkInput = document.querySelector('.links-content input[type="url"]');
    const scanButton = document.querySelector('.links-content .check-btn');
    
    if (!linkInput || !scanButton) {
        console.error('Required elements not found');
        return;
    }

    // Remove any existing result
    const existingResult = linkInput.parentElement.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    // Disable input and button while scanning
    linkInput.disabled = true;
    scanButton.disabled = true;
    scanButton.textContent = document.documentElement.lang === 'ar' ? 'جاري الفحص...' : 'Scanning...';

    try {
        let url = linkInput.value.trim();
        
        // Basic URL validation
        if (!url) {
            throw new Error(document.documentElement.lang === 'ar' 
                ? 'الرجاء إدخال رابط صحيح'
                : 'Please enter a valid URL');
        }

        // URL correction logic
        if (!url.match(/^https?:\/\//i)) {
            // Check if it starts with www.
            if (url.startsWith('www.')) {
                url = 'https://' + url;
            } else {
                url = 'https://www.' + url;
            }
            
            // Update the input value with the corrected URL
            linkInput.value = url;
        }

        // URL format validation and protocol check
        let urlObject;
        try {
            urlObject = new URL(url);
            
            // Check if using insecure HTTP
            if (urlObject.protocol === 'http:') {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'scan-result unsafe';
                resultDiv.textContent = document.documentElement.lang === 'ar'
                    ? ' تحذير: هذا الرابط غير آمن لأنه يستخدم بروتوكول HTTP غير المشفر. قد يتم اعتراض بياناتك!'
                    : ' Warning: This link is unsafe as it uses unencrypted HTTP. Your data may be intercepted!';
                linkInput.parentElement.appendChild(resultDiv);
                return;
            }
        } catch {
            throw new Error(document.documentElement.lang === 'ar'
                ? 'صيغة الرابط غير صحيحة'
                : 'Invalid URL format');
        }

        // First, get the URL ID from VirusTotal
        const urlId = btoa(url).replace(/=/g, '');
        
        // Try to get analysis first
        let response = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
            method: 'GET',
            headers: {
                'x-apikey': VIRUSTOTAL_API_KEY
            }
        });

        // If URL not found, submit it for scanning
        if (response.status === 404) {
            const formData = new FormData();
            formData.append('url', url);
            
            response = await fetch('https://www.virustotal.com/api/v3/urls', {
                method: 'POST',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error submitting URL for scanning');
            }

            // Wait for analysis to complete
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            response = await fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
                method: 'GET',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                }
            });
        }

        if (!response.ok) {
            throw new Error('Error getting scan results');
        }

        const data = await response.json();
        const stats = data.data.attributes.last_analysis_stats;
        const maliciousCount = stats.malicious + stats.suspicious;
        const isSuspicious = maliciousCount > 0;

        // Create result element with simplified message
        const resultDiv = document.createElement('div');
        resultDiv.className = `scan-result ${isSuspicious ? 'unsafe' : 'safe'}`;
        
        // Simplified message based on language
        if (document.documentElement.lang === 'ar') {
            if (isSuspicious) {
                resultDiv.textContent = ' تحذير: هذا الرابط غير آمن وقد يكون ضار';
            } else {
                resultDiv.textContent = ' الرابط آمن ويمكن الوثوق به';
            }
        } else {
            if (isSuspicious) {
                resultDiv.textContent = ' Warning: This link is unsafe and may be harmful';
            } else {
                resultDiv.textContent = ' Link is safe and trustworthy';
            }
        }

        // Add result after the input group
        linkInput.parentElement.appendChild(resultDiv);

    } catch (error) {
        console.error('Scan error:', error);
        
        // Handle errors
        const resultDiv = document.createElement('div');
        resultDiv.className = 'scan-result unsafe';
        resultDiv.textContent = error.message || (document.documentElement.lang === 'ar'
            ? 'حدث خطأ أثناء فحص الرابط'
            : 'Error scanning the link');
        linkInput.parentElement.appendChild(resultDiv);
    } finally {
        // Re-enable input and button
        linkInput.disabled = false;
        scanButton.disabled = false;
        scanButton.textContent = document.documentElement.lang === 'ar' ? 'فحص الرابط' : 'Check Link';
    }
}

// قائمة روابط البنوك الكويتية الرسمية
const officialBankDomains = {
    'kfh.com': {
        name: 'بيت التمويل الكويتي',
        mainDomains: ['kfh.com', 'www.kfh.com'],
        paymentDomains: ['payments.kfh.com', 'pay.kfh.com', 'kpay.kfh.com', 'kfhonline.com', 'tam.kfh.com'],
        onlineDomains: ['online.kfh.com', 'kfhonline.com', 'online.kfhonline.com']
    },
    'nbk.com': {
        name: 'بنك الكويت الوطني',
        mainDomains: ['nbk.com', 'www.nbk.com'],
        paymentDomains: ['payments.nbk.com', 'pay.nbk.com', 'nbkpay.com'],
        onlineDomains: ['online.nbk.com', 'nbkonline.com']
    },
    'burgan.com': {
        name: 'بنك برقان',
        mainDomains: ['burgan.com', 'www.burgan.com'],
        paymentDomains: ['payments.burgan.com', 'pay.burgan.com'],
        onlineDomains: ['online.burgan.com']
    },
    'cbk.com': {
        name: 'البنك التجاري الكويتي',
        mainDomains: ['cbk.com', 'www.cbk.com'],
        paymentDomains: ['payments.cbk.com', 'pay.cbk.com'],
        onlineDomains: ['online.cbk.com']
    },
    'abk.com.kw': {
        name: 'البنك الأهلي الكويتي',
        mainDomains: ['abk.com.kw', 'www.abk.com.kw'],
        paymentDomains: ['payments.abk.com.kw', 'pay.abk.com.kw'],
        onlineDomains: ['online.abk.com.kw']
    },
    'ahliunited.com.kw': {
        name: 'البنك الأهلي المتحد',
        mainDomains: ['ahliunited.com.kw', 'www.ahliunited.com.kw'],
        paymentDomains: ['payments.ahliunited.com.kw', 'pay.ahliunited.com.kw'],
        onlineDomains: ['online.ahliunited.com.kw']
    },
    'bankboubyan.com': {
        name: 'بنك بوبيان',
        mainDomains: ['bankboubyan.com', 'www.bankboubyan.com'],
        paymentDomains: ['payments.bankboubyan.com', 'pay.bankboubyan.com'],
        onlineDomains: ['online.bankboubyan.com']
    }
};

async function verifyBankLink() {
    const linkInput = document.querySelector('.tool-panel:nth-child(2) .tool-input');
    const verifyButton = document.querySelector('.tool-panel:nth-child(2) .check-btn');
    
    if (!linkInput || !verifyButton) {
        console.error('Required elements not found');
        return;
    }

    // Remove any existing result
    const existingResult = linkInput.parentElement.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    // Disable input and button while verifying
    linkInput.disabled = true;
    verifyButton.disabled = true;
    verifyButton.textContent = document.documentElement.lang === 'ar' ? 'جاري التحقق...' : 'Verifying...';

    try {
        let url = linkInput.value.trim();
        
        // Basic URL validation
        if (!url) {
            throw new Error(document.documentElement.lang === 'ar' 
                ? 'الرجاء إدخال رابط البنك'
                : 'Please enter a bank link');
        }

        // URL correction logic
        if (!url.match(/^https?:\/\//i)) {
            if (url.startsWith('www.')) {
                url = 'https://' + url;
            } else {
                url = 'https://' + url;
            }
            linkInput.value = url;
        }

        // Parse URL
        const urlObject = new URL(url);
        const protocol = urlObject.protocol;
        const fullDomain = urlObject.hostname.toLowerCase();
        
        // Create result element
        const resultDiv = document.createElement('div');
        
        // Check protocol security
        if (protocol !== 'https:') {
            resultDiv.className = 'scan-result unsafe';
            resultDiv.textContent = document.documentElement.lang === 'ar'
                ? 'تحذير: الرابط غير آمن! يجب أن يبدأ بـ HTTPS'
                : 'Warning: Link is not secure! Must use HTTPS';
            linkInput.parentElement.appendChild(resultDiv);
            return;
        }

        // Check for suspicious characters
        if (fullDomain.includes('--') || /[^a-zA-Z0-9.-]/.test(fullDomain)) {
            resultDiv.className = 'scan-result unsafe';
            resultDiv.textContent = document.documentElement.lang === 'ar'
                ? 'تحذير: رابط مشبوه! يحتوي على رموز غير آمنة'
                : 'Warning: Suspicious link! Contains unsafe characters';
            linkInput.parentElement.appendChild(resultDiv);
            return;
        }

        // Check for payment-specific URLs first
        for (const [bankDomain, bankInfo] of Object.entries(officialBankDomains)) {
            if (bankInfo.paymentPatterns) {
                for (const pattern of bankInfo.paymentPatterns) {
                    if (pattern.test(url)) {
                        resultDiv.className = 'scan-result safe';
                        resultDiv.textContent = document.documentElement.lang === 'ar'
                            ? `هذا رابط دفع آمن وموثوق لـ ${bankInfo.name}`
                            : `This is a secure payment link for ${bankInfo.name}`;
                        linkInput.parentElement.appendChild(resultDiv);
                        return;
                    }
                }
            }
        }

        // Check domain type and validity
        let isOfficial = false;
        let bankName = '';
        let domainType = '';
        
        for (const [bankDomain, bankInfo] of Object.entries(officialBankDomains)) {
            // Check main domains
            if (bankInfo.mainDomains.includes(fullDomain)) {
                isOfficial = true;
                bankName = bankInfo.name;
                domainType = 'main';
                break;
            }
            // Check payment domains
            if (bankInfo.paymentDomains.includes(fullDomain)) {
                isOfficial = true;
                bankName = bankInfo.name;
                domainType = 'payment';
                break;
            }
            // Check online banking domains
            if (bankInfo.onlineDomains.includes(fullDomain)) {
                isOfficial = true;
                bankName = bankInfo.name;
                domainType = 'online';
                break;
            }
        }

        if (isOfficial) {
            resultDiv.className = 'scan-result safe';
            if (domainType === 'main') {
                resultDiv.textContent = document.documentElement.lang === 'ar'
                    ? `هذا هو الموقع الرسمي لـ ${bankName}`
                    : `This is the official website of ${bankName}`;
            } else if (domainType === 'payment') {
                resultDiv.textContent = document.documentElement.lang === 'ar'
                    ? `هذا رابط دفع آمن وموثوق لـ ${bankName}`
                    : `This is a secure payment link for ${bankName}`;
            } else {
                resultDiv.textContent = document.documentElement.lang === 'ar'
                    ? `هذا رابط الخدمات المصرفية الإلكترونية لـ ${bankName}`
                    : `This is the online banking link for ${bankName}`;
            }
        } else {
            resultDiv.className = 'scan-result unsafe';
            resultDiv.textContent = document.documentElement.lang === 'ar'
                ? 'تحذير: هذا ليس رابطاً رسمياً لأي بنك كويتي! كن حذراً'
                : 'Warning: This is not an official Kuwaiti bank link! Be careful';
        }

        // Add result after the input group
        linkInput.parentElement.appendChild(resultDiv);

    } catch (error) {
        console.error('Verification error:', error);
        
        // Handle errors
        const resultDiv = document.createElement('div');
        resultDiv.className = 'scan-result unsafe';
        resultDiv.textContent = error.message || (document.documentElement.lang === 'ar'
            ? 'حدث خطأ أثناء التحقق من الرابط'
            : 'Error verifying the link');
        linkInput.parentElement.appendChild(resultDiv);
    } finally {
        // Re-enable input and button
        linkInput.disabled = false;
        verifyButton.disabled = false;
        verifyButton.textContent = document.documentElement.lang === 'ar' ? 'تحقق من الرابط' : 'Verify Link';
    }
}

// إضافة معلومات الأدوات
const toolsInfo = {
    'suspicious-links': {
        title: {
            ar: 'كاشف الروابط المشبوهة',
            en: 'Suspicious Links Detector'
        },
        description: {
            ar: 'تقوم هذه الأداة بفحص الروابط للكشف عن علامات الاحتيال المحتملة مثل النطاقات المزيفة والروابط المشبوهة. تساعد في حماية المستخدم من الوقوع ضحية لعمليات التصيد والاحتيال.',
            en: 'This tool scans links to detect potential fraud indicators such as fake domains and suspicious URLs. It helps protect users from falling victim to phishing and fraud attempts.'
        }
    },
    'bank-links': {
        title: {
            ar: 'كاشف روابط البنوك',
            en: 'Bank Links Verifier'
        },
        description: {
            ar: 'تتحقق هذه الأداة من روابط البنوك الكويتية للتأكد من أنها روابط رسمية وآمنة. تساعد في تجنب المواقع المزيفة التي تحاول سرقة المعلومات البنكية.',
            en: 'This tool verifies Kuwaiti bank links to ensure they are official and secure. It helps avoid fake websites attempting to steal banking information.'
        }
    },
    'file-checker': {
        title: {
            ar: 'فاحص الملفات',
            en: 'File Checker'
        },
        description: {
            ar: 'تقوم هذه الأداة بفحص الملفات للكشف عن البرامج الضارة والفيروسات. تدعم معظم أنواع الملفات وتستخدم قاعدة بيانات كبيرة للتهديدات المعروفة.',
            en: 'This tool scans files for malware and viruses. It supports most file types and uses a large database of known threats.'
        }
    },
    'dark-web-checker': {
        title: {
            ar: 'فاحص الويب المظلم',
            en: 'Dark Web Checker'
        },
        description: {
            ar: 'تحقق مما إذا كان بريدك الإلكتروني قد تم تسريبه في الويب المظلم. نقوم بفحص قواعد البيانات المسربة للعثور على أي معلومات مرتبطة ببريدك الإلكتروني.',
            en: 'Check if your email has been leaked on the dark web. We scan leaked databases to find any information associated with your email.'
        }
    },
    'track-order': {
        title: {
            ar: 'تتبع الطلبية',
            en: 'Track Order'
        },
        description: {
            ar: 'تتيح هذه الأداة تتبع طلبيتك باستخدام رقم التتبع الخاص بها. تدعم العديد من شركات الشحن العالمية.',
            en: 'This tool allows you to track your order using its tracking number. Supports multiple global shipping carriers.'
        }
    }
};

function showToolInfo(toolId) {
    // إزالة أي نافذة معلومات سابقة
    const existingInfo = document.querySelector('.tool-info');
    if (existingInfo) {
        existingInfo.remove();
    }

    const toolInfo = toolsInfo[toolId];
    const lang = document.documentElement.lang;
    
    // إنشاء نافذة المعلومات
    const infoDiv = document.createElement('div');
    infoDiv.className = 'tool-info';
    
    infoDiv.innerHTML = `
        <h3>${toolInfo.title[lang]}</h3>
        <p>${toolInfo.description[lang]}</p>
        <button class="close-info" onclick="this.parentElement.remove()">
            ${lang === 'ar' ? 'إغلاق' : 'Close'}
        </button>
    `;
    
    document.body.appendChild(infoDiv);
}

// إضافة دالة فحص الملفات
async function checkFile() {
    const fileInput = document.getElementById('fileInput');
    const checkButton = document.querySelector('.links-content .check-btn[data-translate="check-file"]');
    const container = fileInput.parentElement;
    
    // إزالة أي نتائج سابقة
    const existingResult = container.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }
    
    if (!fileInput.files[0]) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'scan-result unsafe';
        errorDiv.textContent = document.documentElement.lang === 'ar' 
            ? 'الرجاء اختيار ملف للفحص'
            : 'Please select a file to scan';
        container.appendChild(errorDiv);
        return;
    }

    // تعطيل الزر أثناء الفحص
    checkButton.disabled = true;
    checkButton.textContent = document.documentElement.lang === 'ar' ? 'جاري الفحص...' : 'Scanning...';

    try {
        const file = fileInput.files[0];
        
        // التحقق من حجم الملف (الحد الأقصى 32MB)
        if (file.size > 32 * 1024 * 1024) {
            throw new Error(document.documentElement.lang === 'ar' 
                ? 'حجم الملف يجب أن يكون أقل من 32 ميجابايت'
                : 'File size must be less than 32MB');
        }

        // قراءة الملف كـ ArrayBuffer
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        // حساب SHA-256 hash للملف
        const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const fileHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // استعلام VirusTotal عن الملف
        const response = await fetch(`https://www.virustotal.com/api/v3/files/${fileHash}`, {
            method: 'GET',
            headers: {
                'x-apikey': VIRUSTOTAL_API_KEY
            }
        });

        // إذا لم يتم العثور على الملف، قم برفعه
        if (response.status === 404) {
            // الحصول على URL لرفع الملف
            const uploadUrlResponse = await fetch('https://www.virustotal.com/api/v3/files/upload_url', {
                method: 'GET',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                }
            });

            const uploadUrlData = await uploadUrlResponse.json();
            const uploadUrl = uploadUrlData.data;

            // رفع الملف
            const formData = new FormData();
            formData.append('file', file);

            await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                },
                body: formData
            });

            // انتظار لمدة 3 ثواني للتحليل
            await new Promise(resolve => setTimeout(resolve, 3000));

            // إعادة الاستعلام عن نتائج التحليل
            const analysisResponse = await fetch(`https://www.virustotal.com/api/v3/files/${fileHash}`, {
                method: 'GET',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                }
            });

            if (!analysisResponse.ok) {
                throw new Error('Error analyzing file');
            }

            const analysisData = await analysisResponse.json();
            showFileAnalysisResult(analysisData);
        } else {
            const data = await response.json();
            showFileAnalysisResult(data);
        }

    } catch (error) {
        console.error('File check error:', error);
        showFileError(error.message);
    } finally {
        // إعادة تفعيل الزر
        checkButton.disabled = false;
        checkButton.textContent = document.documentElement.lang === 'ar' ? 'فحص الملف' : 'Check File';
    }
}

// دالة لعرض نتائج تحليل الملف
function showFileAnalysisResult(data) {
    const fileInput = document.getElementById('fileInput');
    const container = fileInput.parentElement;
    
    // إزالة أي نتائج سابقة
    const existingResult = container.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    const stats = data.data.attributes.last_analysis_stats;
    const maliciousCount = stats.malicious + stats.suspicious;
    
    const resultDiv = document.createElement('div');
    resultDiv.className = `scan-result ${maliciousCount > 0 ? 'unsafe' : 'safe'}`;
    
    if (document.documentElement.lang === 'ar') {
        resultDiv.textContent = maliciousCount > 0
            ? `تحذير: تم اكتشاف ${maliciousCount} تهديد في الملف`
            : 'الملف آمن ولا يحتوي على تهديدات';
    } else {
        resultDiv.textContent = maliciousCount > 0
            ? `Warning: ${maliciousCount} threats detected in the file`
            : 'File is safe and contains no threats';
    }

    container.appendChild(resultDiv);
}

// دالة لعرض رسائل الخطأ
function showFileError(message) {
    const fileInput = document.getElementById('fileInput');
    const container = fileInput.parentElement;
    
    // إزالة أي نتائج سابقة
    const existingResult = container.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'scan-result unsafe';
    errorDiv.textContent = message;
    container.appendChild(errorDiv);
}

// إضافة مستمع الحدث لزر الفحص
document.addEventListener('DOMContentLoaded', function() {
    const checkFileBtn = document.querySelector('.links-content .check-btn[data-translate="check-file"]');
    if (checkFileBtn) {
        checkFileBtn.addEventListener('click', checkFile);
    }
});

// إضافة مفتاح API لخدمة Have I Been Pwned
const HIBP_API_KEY = 'https://haveibeenpwned.com/api/v3/breachedaccount/%7Bronrozorooo@gmail.com%7D'; // تحتاج للحصول على مفتاح API من الموقع

async function checkDarkWeb() {
    const emailInput = document.querySelector('[data-translate-placeholder="enter-email"]');
    const email = emailInput.value.trim();
    
    // التحقق من صحة البريد الإلكتروني
    if (!isValidEmail(email)) {
        showResult('dark-web', {
            status: 'error',
            message: 'الرجاء إدخال بريد إلكتروني صحيح'
        });
        return;
    }

    // إظهار حالة التحميل
    const button = document.querySelector('[onclick="checkDarkWeb()"]');
    const originalText = button.textContent;
    button.textContent = 'جاري الفحص...';
    button.disabled = true;

    try {
        // استخدام API haveibeenpwned للتحقق من تسريب البريد الإلكتروني
        const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
            method: 'GET',
            headers: {
                'hibp-api-key': 'YOUR_API_KEY_HERE' // تحتاج للحصول على مفتاح API من الموقع
            }
        });

        let result;
        if (response.status === 404) {
            // البريد الإلكتروني آمن
            result = {
                status: 'safe',
                message: 'لم يتم العثور على تسريبات لهذا البريد الإلكتروني'
            };
        } else if (response.status === 200) {
            // تم العثور على تسريبات
            const breaches = await response.json();
            result = {
                status: 'unsafe',
                message: `تم العثور على ${breaches.length} تسريب لهذا البريد الإلكتروني`,
                details: breaches
            };
        }

        showResult('dark-web', result);
    } catch (error) {
        showResult('dark-web', {
            status: 'error',
            message: 'حدث خطأ أثناء الفحص. الرجاء المحاولة مرة أخرى'
        });
    } finally {
        // إعادة الزر إلى حالته الأصلية
        button.textContent = originalText;
        button.disabled = false;
    }
}

function showResult(type, result) {
    // إزالة أي نتائج سابقة
    const existingResult = document.querySelector('.scan-result');
    if (existingResult) {
        existingResult.remove();
    }

    // إنشاء عنصر النتيجة
    const resultElement = document.createElement('div');
    resultElement.className = `scan-result ${result.status}`;

    // إضافة أيقونة مناسبة
    let icon = '';
    switch (result.status) {
        case 'safe':
            icon = '<i class="fas fa-check-circle"></i> ';
            break;
        case 'unsafe':
            icon = '<i class="fas fa-exclamation-triangle"></i> ';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle"></i> ';
            break;
    }

    // إضافة المحتوى
    resultElement.innerHTML = `
        <div class="result-header ${result.status}">
            ${icon}${result.message}
        </div>
        ${result.details ? `
        <div class="result-details">
            <p>المواقع التي تم تسريب البيانات منها:</p>
            <ul>
                ${result.details.map(breach => `
                    <li>${breach.Name} (${breach.BreachDate})</li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
    `;

    // إضافة النتيجة بعد حقل الإدخال
    const inputGroup = document.querySelector(`[data-translate-placeholder="enter-email"]`).closest('.input-group');
    inputGroup.insertAdjacentElement('afterend', resultElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function trackOrder() {
    const trackingInput = document.querySelector('input[data-translate-placeholder="enter-tracking-number"]');
    const trackingNumber = trackingInput.value.trim();
    
    // Remove any existing results
    const existingResult = document.querySelector('.tracking-result');
    if (existingResult) {
        existingResult.remove();
    }

    if (!trackingNumber) {
        showError(document.documentElement.lang === 'ar' 
            ? 'الرجاء إدخال رقم التتبع'
            : 'Please enter a tracking number');
        return;
    }

    try {
        // Show loading state
        showLoadingState(trackingInput);

        // Replace this with your valid Ship24 API key
        const API_KEY = 'apik_cjwYYNlOhUgdVGnUX34uyg6y9UANQc';
        
        const response = await fetch('https://api.ship24.com/public/v1/tracking/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ trackingNumber })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        showTrackingResult(data, trackingInput);

    } catch (error) {
        console.error('Tracking error:', error);
        showError(document.documentElement.lang === 'ar'
            ? 'حدث خطأ أثناء التتبع. الرجاء المحاولة مرة أخرى'
            : 'Error tracking order. Please try again.');
    }
}

function showLoadingState(input) {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'tracking-result loading';
    loadingElement.innerHTML = `
        <div class="result-header">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-translate="checking-status">جاري التحقق...</span>
        </div>
    `;
    input.closest('.input-group').insertAdjacentElement('afterend', loadingElement);
}

function showTrackingResult(data, input) {
    const resultElement = document.createElement('div');
    resultElement.className = 'tracking-result';

    if (data.data && data.data.trackings && data.data.trackings.length > 0) {
        const tracking = data.data.trackings[0];
        const shipment = tracking.shipment;
        
        resultElement.innerHTML = `
            <div class="result-header success">
                <i class="fas fa-box"></i>
                <span>Tracking Information Found</span>
            </div>
            <div class="result-details">
                <div class="tracking-info">
                    <p><strong>Origin:</strong> ${shipment.originCountryCode || 'N/A'}</p>
                    <p><strong>Destination:</strong> ${shipment.destinationCountryCode || 'N/A'}</p>
                    <p><strong>Status:</strong> ${shipment.status || 'N/A'}</p>
                    <p><strong>Last Update:</strong> ${new Date(shipment.lastUpdate).toLocaleString()}</p>
                </div>
                ${shipment.events && shipment.events.length > 0 ? `
                    <div class="tracking-timeline">
                        <h4>Tracking Timeline</h4>
                        ${shipment.events.map(event => `
                            <div class="timeline-event">
                                <div class="event-date">${new Date(event.timestamp).toLocaleString()}</div>
                                <div class="event-location">${event.location || 'N/A'}</div>
                                <div class="event-status">${event.status || 'N/A'}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        resultElement.innerHTML = `
            <div class="result-header error">
                <i class="fas fa-exclamation-circle"></i>
                <span data-translate="order-not-found">لم يتم العثور على الطلبية</span>
            </div>
        `;
    }

    input.closest('.input-group').insertAdjacentElement('afterend', resultElement);
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'tracking-result error';
    errorElement.innerHTML = `
        <div class="result-header">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    const existingError = document.querySelector('.tracking-result');
    if (existingError) {
        existingError.remove();
    }
    
    const trackingInput = document.querySelector('input[data-translate-placeholder="enter-tracking-number"]');
    trackingInput.closest('.input-group').insertAdjacentElement('afterend', errorElement);
}
