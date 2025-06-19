document.addEventListener('DOMContentLoaded', function() {
    // ===== 元素引用 =====
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const layoutMenu = document.getElementById('layout-menu');
    const pageOverlay = document.getElementById('page-overlay');
    const menuItems = document.getElementById('menu-items');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const topNavBar = document.querySelector('.top-nav-bar');
    
    // ===== 滾動進度條初始化 =====
    let scrollProgressBar = null;
    
    function initScrollProgress() {
        // 創建滾動進度條元素
        scrollProgressBar = document.createElement('div');
        scrollProgressBar.id = 'scroll-progress';
        scrollProgressBar.style.cssText = `
            position: fixed;
            top: 80px;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-accent), var(--secondary-accent));
            z-index: 1001;
            transition: width 0.1s ease-out;
            border-radius: 0 2px 2px 0;
            box-shadow: 0 0 10px var(--primary-accent-transparent);
        `;
        document.body.appendChild(scrollProgressBar);
    }
    
    function updateScrollProgress() {
        if (!scrollProgressBar) return;
        
        // 計算從topbar底下開始的滾動進度
        const topNavHeight = topNavBar ? topNavBar.offsetHeight : 80;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // 調整計算，從topbar底下開始
        const adjustedScrollTop = Math.max(0, scrollTop - topNavHeight);
        const adjustedDocumentHeight = Math.max(1, documentHeight - topNavHeight);
        
        const scrollPercent = Math.min(100, (adjustedScrollTop / adjustedDocumentHeight) * 100);
        scrollProgressBar.style.width = scrollPercent + '%';
    }
    
    // ===== 菜單滾動檢測優化 =====
    function checkMenuScrollNeed() {
        if (!menuItems || !layoutMenu) return;
        
        // 只在桌面端應用動態滾動檢測
        if (window.innerWidth > 1340) {
            const viewportHeight = window.innerHeight;
            const menuHeight = layoutMenu.offsetHeight;
            const menuItemsHeight = menuItems.scrollHeight;
            const menuCategoryHeight = document.querySelector('.menu-category')?.offsetHeight || 0;
            const menuCopyrightHeight = document.querySelector('.menu-copyright')?.offsetHeight || 0;
            
            // 計算可用空間
            const availableHeight = menuHeight - menuCategoryHeight - menuCopyrightHeight - 40; // 40px for padding
            
            if (viewportHeight < 800 || menuItemsHeight > availableHeight) {
                menuItems.style.overflowY = 'auto';
                menuItems.style.maxHeight = availableHeight + 'px';
                layoutMenu.style.overflowY = 'hidden';
            } else {
                menuItems.style.overflowY = 'visible';
                menuItems.style.maxHeight = 'none';
                layoutMenu.style.overflowY = 'visible';
            }
        } else {
            // 移動端重置
            menuItems.style.overflowY = 'auto';
            menuItems.style.maxHeight = 'none';
        }
    }
    
    // ===== 統一主題管理系統 =====
    class ThemeManager {
        constructor() {
            this.themes = ['light', 'dark'];
            this.currentTheme = null;
            this.transitionDuration = 300;
            this.systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.callbacks = new Set();
            
            this.init();
        }
        
        init() {
            // 獲取初始主題
            this.currentTheme = this.getInitialTheme();
            
            // 立即應用主題，避免閃爍
            this.applyTheme(this.currentTheme, false);
            
            // 監聽系統主題變化
            this.systemMediaQuery.addEventListener('change', (e) => {
                if (!this.hasUserPreference()) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.setTheme(systemTheme, false);
                }
            });
        }
        
        getInitialTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme && this.themes.includes(savedTheme)) {
                return savedTheme;
            }
            
            // 使用系統偏好
            return this.systemMediaQuery.matches ? 'dark' : 'light';
        }
        
        hasUserPreference() {
            return localStorage.getItem('theme') !== null;
        }
        
        setTheme(theme, withTransition = true, savePreference = true) {
            if (!this.themes.includes(theme) || theme === this.currentTheme) {
                return false;
            }
            
            const oldTheme = this.currentTheme;
            this.currentTheme = theme;
            
            this.applyTheme(theme, withTransition);
            
            if (savePreference) {
                localStorage.setItem('theme', theme);
            }
            
            // 觸發回調
            this.callbacks.forEach(callback => {
                try {
                    callback(theme, oldTheme);
                } catch (error) {
                    console.warn('Theme callback error:', error);
                }
            });
            
            return true;
        }
        
        applyTheme(theme, withTransition = true) {
            if (withTransition) {
                document.body.classList.add('theme-transitioning');
            }
            
            htmlElement.setAttribute('data-theme', theme);
            
            if (withTransition) {
                setTimeout(() => {
                    document.body.classList.remove('theme-transitioning');
                }, this.transitionDuration);
            }
        }
        
        toggle() {
            const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            return this.setTheme(nextTheme);
        }
        
        getCurrentTheme() {
            return this.currentTheme;
        }
        
        isDark() {
            return this.currentTheme === 'dark';
        }
        
        isLight() {
            return this.currentTheme === 'light';
        }
        
        onThemeChange(callback) {
            if (typeof callback === 'function') {
                this.callbacks.add(callback);
            }
        }
        
        offThemeChange(callback) {
            this.callbacks.delete(callback);
        }
        
        clearUserPreference() {
            localStorage.removeItem('theme');
            const systemTheme = this.systemMediaQuery.matches ? 'dark' : 'light';
            this.setTheme(systemTheme, true, false);
        }
    }
    
    // 創建全局主題管理器實例
    const themeManager = new ThemeManager();
    
    // 向後兼容的函數
    function toggleTheme() {
        return themeManager.toggle();
    }
    
    function initTheme() {
        // 已經在 ThemeManager 構造函數中初始化
        return themeManager;
    }
    
    // ===== 菜單控制 =====
    function openMenu() {
        document.body.classList.add('menu-open');
        layoutMenu?.classList.add('active');
        pageOverlay?.classList.add('active');
    }
    
    function closeMenu() {
        document.body.classList.remove('menu-open');
        layoutMenu?.classList.remove('active');
        pageOverlay?.classList.remove('active');
    }
    
    function toggleMenu() {
        if (layoutMenu?.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // ===== 事件監聽器 =====
    
    // 滾動進度
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    // 窗口大小變化
    window.addEventListener('resize', () => {
        checkMenuScrollNeed();
        updateScrollProgress();
    }, { passive: true });
    
    // 菜單控制
    menuToggleBtn?.addEventListener('click', toggleMenu);
    menuCloseBtn?.addEventListener('click', closeMenu);
    pageOverlay?.addEventListener('click', (e) => {
        if (e.target === pageOverlay) {
            closeMenu();
        }
    });
    
    // 主題切換
    themeToggle?.addEventListener('click', toggleTheme);
    
    // ESC鍵關閉菜單
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && layoutMenu?.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // ===== 初始化 =====
    initTheme();
    initScrollProgress();
    checkMenuScrollNeed();
    updateScrollProgress();
    
    // 頁面加載完成後的最終檢查
    window.addEventListener('load', () => {
        checkMenuScrollNeed();
        updateScrollProgress();
    });
});