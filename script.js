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
        // 检查是否已存在进度条，避免重复创建
        const existingProgressBar = document.getElementById('scroll-progress');
        if (existingProgressBar) {
            scrollProgressBar = existingProgressBar;
            return;
        }

        // 創建滾動進度條元素
        scrollProgressBar = document.createElement('div');
        scrollProgressBar.id = 'scroll-progress';
        scrollProgressBar.style.cssText = `
            position: fixed;
            top: 57px;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-accent), var(--secondary-accent));
            z-index: 10000;
            transition: width 0.1s ease-out;
            border-radius: 0 2px 2px 0;
            box-shadow: 0 0 10px var(--primary-accent-transparent);
            pointer-events: none;
        `;
        document.body.appendChild(scrollProgressBar);
    }
    
    function updateScrollProgress() {
        if (!scrollProgressBar) {
            // 如果进度条不存在，尝试重新获取
            scrollProgressBar = document.getElementById('scroll-progress');
            if (!scrollProgressBar) return;
        }

        // 計算滾動進度
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

        // 确保分母不为0
        if (documentHeight <= 0) {
            scrollProgressBar.style.width = '0%';
            return;
        }

        const scrollPercent = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
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
    
    // ===== 最後更新時間 =====
    function updateLastModified() {
        const lastUpdatedElement = document.getElementById('last-updated');
        if (lastUpdatedElement) {
            const lastModifiedDate = new Date(document.lastModified);
            lastUpdatedElement.textContent = lastModifiedDate.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        }
    }

    // ===== 增強動畫系統 | ENHANCED ANIMATION SYSTEM =====
    class EnhancedAnimationSystem {
        constructor() {
            this.cursorTrail = [];
            this.maxTrailLength = 8;
            this.inkWashCanvas = null;
            this.inkWashCtx = null;
            this.inkParticles = [];
            this.init();
        }

        init() {
            this.initScrollAnimations();
            this.initCursorEffects();
            this.initInkWashBackground();
            this.initCardHoverEffects();
            this.initClickAnimations();
        }

        // 滾動動畫
        initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animate-in');
                    }
                });
            }, { threshold: 0.1 });

            const animateElements = document.querySelectorAll('.content-card');
            animateElements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
                observer.observe(el);
            });
        }

        // 鼠標軌跡效果
        initCursorEffects() {
            document.addEventListener('mousemove', (e) => {
                this.addCursorTrail(e.clientX, e.clientY);
                this.updateCursorTrail();
            });
        }

        addCursorTrail(x, y) {
            this.cursorTrail.push({
                x: x,
                y: y,
                life: 1.0,
                size: Math.random() * 4 + 2
            });

            if (this.cursorTrail.length > this.maxTrailLength) {
                this.cursorTrail.shift();
            }
        }

        updateCursorTrail() {
            // 移除現有的軌跡元素
            document.querySelectorAll('.cursor-trail').forEach(el => el.remove());

            this.cursorTrail.forEach((point, index) => {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.cssText = `
                    position: fixed;
                    left: ${point.x - point.size/2}px;
                    top: ${point.y - point.size/2}px;
                    width: ${point.size}px;
                    height: ${point.size}px;
                    background: radial-gradient(circle,
                        hsla(${280 + index * 10}, 60%, 70%, ${point.life * 0.6}),
                        hsla(${45 + index * 5}, 65%, 68%, ${point.life * 0.3}));
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9998;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(trail);

                // 減少生命值
                point.life -= 0.15;
            });

            // 移除生命值為0的點
            this.cursorTrail = this.cursorTrail.filter(point => point.life > 0);
        }

        // 水墨背景效果
        initInkWashBackground() {
            this.inkWashCanvas = document.createElement('canvas');
            this.inkWashCanvas.id = 'ink-wash-canvas';
            this.inkWashCanvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                opacity: 0.4;
            `;
            document.body.appendChild(this.inkWashCanvas);

            this.inkWashCtx = this.inkWashCanvas.getContext('2d');
            this.resizeInkCanvas();
            this.createInkParticles();
            this.animateInkWash();

            window.addEventListener('resize', () => this.resizeInkCanvas());
        }

        resizeInkCanvas() {
            this.inkWashCanvas.width = window.innerWidth;
            this.inkWashCanvas.height = window.innerHeight;
        }

        createInkParticles() {
            for (let i = 0; i < 15; i++) {
                this.inkParticles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 100 + 50,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.3 + 0.1,
                    color: Math.random() > 0.5 ? 'rgba(177, 156, 217, ' : 'rgba(222, 184, 135, '
                });
            }
        }

        animateInkWash() {
            this.inkWashCtx.clearRect(0, 0, this.inkWashCanvas.width, this.inkWashCanvas.height);

            this.inkParticles.forEach(particle => {
                // 更新位置
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // 邊界檢查
                if (particle.x < -particle.size) particle.x = this.inkWashCanvas.width + particle.size;
                if (particle.x > this.inkWashCanvas.width + particle.size) particle.x = -particle.size;
                if (particle.y < -particle.size) particle.y = this.inkWashCanvas.height + particle.size;
                if (particle.y > this.inkWashCanvas.height + particle.size) particle.y = -particle.size;

                // 繪製粒子
                const gradient = this.inkWashCtx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size
                );
                gradient.addColorStop(0, particle.color + particle.opacity + ')');
                gradient.addColorStop(1, particle.color + '0)');

                this.inkWashCtx.fillStyle = gradient;
                this.inkWashCtx.beginPath();
                this.inkWashCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.inkWashCtx.fill();
            });

            requestAnimationFrame(() => this.animateInkWash());
        }

        // 卡片懸浮效果
        initCardHoverEffects() {
            const cards = document.querySelectorAll('.content-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-6px) scale(1.02)';
                    card.style.boxShadow = '0 12px 40px var(--glass-shadow), 0 0 0 1px var(--primary-accent-transparent)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                });
            });
        }

        // 點擊動畫
        initClickAnimations() {
            document.addEventListener('click', (e) => {
                this.createClickRipple(e.clientX, e.clientY);
            });
        }

        createClickRipple(x, y) {
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            ripple.style.cssText = `
                position: fixed;
                left: ${x - 25}px;
                top: ${y - 25}px;
                width: 50px;
                height: 50px;
                border: 2px solid var(--primary-accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: rippleExpand 0.6s ease-out forwards;
            `;
            document.body.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }
    }

    // 創建增強動畫系統實例
    const enhancedAnimations = new EnhancedAnimationSystem();

    // ===== 初始化 =====
    initTheme();
    initScrollProgress();
    checkMenuScrollNeed();
    updateScrollProgress();
    updateLastModified();

    // 頁面加載完成後的最終檢查
    window.addEventListener('load', () => {
        checkMenuScrollNeed();
        updateScrollProgress();
        updateLastModified();
    });
});