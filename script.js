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

    // ===== 星星閃爍背景系統 | TWINKLING STARS BACKGROUND SYSTEM =====

    // 優化的星星閃爍動畫系統
    class OptimizedTwinklingStarsSystem {
        constructor(options = {}) {
            this.config = {
                starCount: this.getOptimalStarCount(),
                colors: {
                    primary: 'rgba(157, 117, 212, 0.8)',
                    secondary: 'rgba(255, 255, 255, 1.0)',
                    bright: 'rgba(255, 255, 255, 0.95)',
                    dim: 'rgba(157, 117, 212, 0.2)'
                },
                performance: {
                    useGPU: true,
                    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                },
                ...options
            };

            this.stars = [];
            this.container = null;
            this.isRunning = false;
            this.performanceLevel = this.detectPerformanceLevel();

            this.init();
        }

        // 智能性能檢測和星星數量優化
        getOptimalStarCount() {
            const isMobile = window.innerWidth < 768;
            const isLowEnd = navigator.hardwareConcurrency < 4;
            const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (hasReducedMotion) return isMobile ? 50 : 100;
            if (isLowEnd) return isMobile ? 200 : 400;
            return isMobile ? 300 : 800; // 減少到更合理的數量
        }

        // 檢測設備性能等級
        detectPerformanceLevel() {
            const cores = navigator.hardwareConcurrency || 2;
            const memory = navigator.deviceMemory || 2;
            const isMobile = window.innerWidth < 768;

            if (cores >= 8 && memory >= 8 && !isMobile) return 'high';
            if (cores >= 4 && memory >= 4) return 'medium';
            return 'low';
        }

        init() {
            this.createContainer();
            this.injectCSS();
            this.createStars();
            this.initScrollAnimations();
            this.initCardHoverEffects();
            this.initClickAnimations();
            this.start();
        }

        createContainer() {
            this.container = document.createElement('div');
            this.container.className = 'optimized-stars-container';
            this.container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                overflow: hidden;
                will-change: transform;
            `;
            document.body.appendChild(this.container);
        }

        // 注入優化的CSS動畫
        injectCSS() {
            if (document.getElementById('optimized-stars-css')) return;

            const style = document.createElement('style');
            style.id = 'optimized-stars-css';
            style.textContent = `
                @keyframes twinkle-bright {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                @keyframes twinkle-dim {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(0.8); }
                }

                @keyframes twinkle-pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.9; }
                }

                .optimized-star {
                    position: absolute;
                    border-radius: 50%;
                    will-change: opacity, transform;
                    backface-visibility: hidden;
                    transform-origin: center;
                }

                .star-bright {
                    animation: twinkle-bright 2s ease-in-out infinite;
                    background: ${this.config.colors.bright};
                    box-shadow: 0 0 8px ${this.config.colors.secondary};
                }

                .star-dim {
                    animation: twinkle-dim 3s ease-in-out infinite;
                    background: ${this.config.colors.primary};
                    box-shadow: 0 0 4px ${this.config.colors.dim};
                }

                .star-pulse {
                    animation: twinkle-pulse 4s ease-in-out infinite;
                    background: ${this.config.colors.primary};
                    box-shadow: 0 0 6px ${this.config.colors.primary};
                }
            `;
            document.head.appendChild(style);
        }

        createStars() {
            // 批量創建DOM元素以提高性能
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < this.config.starCount; i++) {
                const star = this.createOptimizedStar(i);
                fragment.appendChild(star);
            }

            this.container.appendChild(fragment);
        }

        createOptimizedStar(index) {
            const star = document.createElement('div');

            // 隨機位置
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            // 智能大小分配基於性能等級
            const sizeRange = this.performanceLevel === 'high' ? [1, 3] :
                             this.performanceLevel === 'medium' ? [1, 2.5] : [1, 2];
            const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

            // 隨機選擇動畫類型以增加視覺變化
            const animationTypes = ['bright', 'dim', 'pulse'];
            const weights = this.performanceLevel === 'high' ? [0.3, 0.4, 0.3] : [0.2, 0.6, 0.2];
            const animationType = this.getWeightedRandom(animationTypes, weights);

            star.className = `optimized-star star-${animationType}`;

            // 使用transform而非left/top以獲得更好的性能
            star.style.cssText = `
                transform: translate(${x}px, ${y}px);
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${Math.random() * 3}s;
                animation-duration: ${2 + Math.random() * 2}s;
            `;

            this.stars.push(star);
            return star;
        }

        // 加權隨機選擇
        getWeightedRandom(items, weights) {
            const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
            let random = Math.random() * totalWeight;

            for (let i = 0; i < items.length; i++) {
                random -= weights[i];
                if (random <= 0) return items[i];
            }
            return items[items.length - 1];
        }

        // 性能監控和自適應調整
        monitorPerformance() {
            let frameCount = 0;
            let lastTime = performance.now();

            const checkPerformance = () => {
                frameCount++;
                const currentTime = performance.now();

                if (currentTime - lastTime >= 1000) {
                    const fps = frameCount;
                    frameCount = 0;
                    lastTime = currentTime;

                    // 如果FPS過低，減少星星數量
                    if (fps < 30 && this.stars.length > 100) {
                        this.reduceStarCount();
                    }
                }

                if (this.isRunning) {
                    requestAnimationFrame(checkPerformance);
                }
            };

            requestAnimationFrame(checkPerformance);
        }

        // 動態減少星星數量
        reduceStarCount() {
            const reduceBy = Math.floor(this.stars.length * 0.1); // 減少10%
            for (let i = 0; i < reduceBy; i++) {
                const star = this.stars.pop();
                if (star && star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }
        }

        start() {
            this.isRunning = true;
            if (this.performanceLevel !== 'low') {
                this.monitorPerformance();
            }
        }

        stop() {
            this.isRunning = false;
        }

        destroy() {
            this.stop();
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
            // 清理注入的CSS
            const style = document.getElementById('optimized-stars-css');
            if (style) {
                style.remove();
            }
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

        // 增強卡片懸浮效果 - 專注於毛玻璃效果，針對主題優化
        initCardHoverEffects() {
            const cards = document.querySelectorAll('.content-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';

                    card.style.transform = 'translateY(-8px) scale(1.015)';

                    if (isDarkTheme) {
                        // 暗色主題：降低亮度和飽和度，避免過於刺眼
                        card.style.backdropFilter = 'blur(30px) saturate(150%) brightness(1.05)';
                        card.style.background = 'rgba(42, 42, 42, 0.25)';
                        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2), 0 8px 32px rgba(0, 0, 0, 0.1)';
                        card.style.border = '1px solid rgba(232, 230, 227, 0.2)';
                    } else {
                        // 亮色主題：保持原有效果但降低背景透明度
                        card.style.backdropFilter = 'blur(30px) saturate(200%) brightness(1.2)';
                        card.style.background = 'rgba(255, 255, 255, 0.12)';
                        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1)';
                        card.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    }
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                    card.style.backdropFilter = '';
                    card.style.background = '';
                    card.style.boxShadow = '';
                    card.style.border = '';
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

    // 創建優化的星星閃爍背景系統實例
    window.starsBackground = new OptimizedTwinklingStarsSystem({
        starCount: window.innerWidth < 768 ? 400 : 1300 // 使用更合理的數量
    });

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