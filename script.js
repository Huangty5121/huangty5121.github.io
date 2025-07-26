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
    
    // ===== 滾動進度條初始化 - 性能优化版 =====
    let scrollProgressBar = null;
    let ticking = false;

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
            will-change: width;
        `;
        document.body.appendChild(scrollProgressBar);
    }

    // 使用节流优化滚动性能
    function updateScrollProgress() {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (!scrollProgressBar) {
                    scrollProgressBar = document.getElementById('scroll-progress');
                    if (!scrollProgressBar) {
                        ticking = false;
                        return;
                    }
                }

                // 計算滾動進度
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

                // 确保分母不为0
                if (documentHeight <= 0) {
                    scrollProgressBar.style.width = '0%';
                    ticking = false;
                    return;
                }

                const scrollPercent = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
                scrollProgressBar.style.width = scrollPercent + '%';
                ticking = false;
            });
            ticking = true;
        }
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
            // 使用RAF確保在下一個渲染幀執行，避免阻塞
            const applyThemeChanges = () => {
                if (withTransition) {
                    document.body.classList.add('theme-transitioning');
                    // 預先設置will-change以優化性能
                    document.body.style.willChange = 'background-color, color';
                }

                htmlElement.setAttribute('data-theme', theme);

                if (withTransition) {
                    // 使用RAF而非setTimeout以獲得更好的性能
                    let frameCount = 0;
                    const maxFrames = Math.ceil(this.transitionDuration / 16.67); // 60fps

                    const cleanupTransition = () => {
                        frameCount++;
                        if (frameCount >= maxFrames) {
                            document.body.classList.remove('theme-transitioning');
                            document.body.style.willChange = 'auto';
                        } else {
                            requestAnimationFrame(cleanupTransition);
                        }
                    };

                    requestAnimationFrame(cleanupTransition);
                }
            };

            if (withTransition) {
                requestAnimationFrame(applyThemeChanges);
            } else {
                applyThemeChanges();
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
    
    // ===== 事件監聽器 - 性能优化版 =====

    // 节流函数
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 滾動進度 - 使用节流优化
    window.addEventListener('scroll', throttle(updateScrollProgress, 16), { passive: true });

    // 窗口大小變化 - 使用防抖优化
    window.addEventListener('resize', debounce(() => {
        checkMenuScrollNeed();
        updateScrollProgress();
    }, 250), { passive: true });
    
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
            // 先初始化性能等級，再配置星星
            this.performanceLevel = this.detectPerformanceLevel();

            this.config = {
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
                // 動態區間閃爍配置
                dynamicTwinkling: {
                    enabled: true,
                    cycleInterval: 8000, // 8秒一個完整循環
                    fadeTransition: 2000, // 2秒淡入淡出過渡
                    regions: 4, // 4個區間
                    staggerDelay: 2000 // 每個區間間隔2秒
                },
                ...options
            };

            this.stars = [];
            this.starRegions = [[], [], [], []]; // 4個區間的星星數組
            this.container = null;
            this.isRunning = false;
            this.currentActiveRegion = 0;
            this.twinklingCycleId = null;
            this.regionTimers = [];

            this.init();
        }

        // 高密度星星優化 - 智能分層渲染系統
        getOptimalStarCount() {
            const isMobile = window.innerWidth < 768;
            const isLowEnd = navigator.hardwareConcurrency < 4;
            const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const screenArea = window.innerWidth * window.innerHeight;

            // 基於屏幕面積的動態密度計算
            const baseDensity = screenArea / 1000000; // 每百萬像素的基礎星星數

            if (hasReducedMotion) return Math.floor(baseDensity * (isMobile ? 30 : 50));
            if (isLowEnd) return Math.floor(baseDensity * (isMobile ? 80 : 150));

            // 高密度配置 - 更多星星但優化渲染
            return Math.floor(baseDensity * (isMobile ? 200 : 400));
        }

        // 分層星星系統配置
        getStarLayerConfig() {
            const totalStars = this.getOptimalStarCount();
            const performanceLevel = this.performanceLevel;

            // 根據性能等級分配靜態和動態星星比例
            let staticRatio, dynamicRatio;
            switch(performanceLevel) {
                case 'high':
                    staticRatio = 0.6; // 60%靜態，40%動態
                    dynamicRatio = 0.4;
                    break;
                case 'medium':
                    staticRatio = 0.75; // 75%靜態，25%動態
                    dynamicRatio = 0.25;
                    break;
                default: // low
                    staticRatio = 0.9; // 90%靜態，10%動態
                    dynamicRatio = 0.1;
            }

            return {
                total: totalStars,
                static: Math.floor(totalStars * staticRatio),
                dynamic: Math.floor(totalStars * dynamicRatio)
            };
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
                    0%, 100% { opacity: 0.3; transform: scale(1) translateZ(0); }
                    50% { opacity: 1; transform: scale(1.3) translateZ(0); }
                }

                @keyframes twinkle-dim {
                    0%, 100% { opacity: 0.4; transform: scale(1) translateZ(0); }
                    50% { opacity: 0.8; transform: scale(1.15) translateZ(0); }
                }

                @keyframes twinkle-pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1) translateZ(0); }
                    50% { opacity: 1; transform: scale(1.2) translateZ(0); }
                }

                .optimized-star {
                    position: absolute;
                    border-radius: 50%;
                    will-change: opacity, transform;
                    backface-visibility: hidden;
                    transform-origin: center;
                    contain: layout style paint;
                }

                /* 小星星發光效果 */
                .star-small {
                    background: ${this.config.colors.primary};
                    box-shadow: 0 0 calc(var(--star-size, 2px) * 1.5) ${this.config.colors.dim};
                }

                /* 中等星星發光效果 */
                .star-medium {
                    background: ${this.config.colors.bright};
                    box-shadow:
                        0 0 calc(var(--star-size, 3px) * 2) ${this.config.colors.primary},
                        0 0 calc(var(--star-size, 3px) * 1) ${this.config.colors.bright};
                }

                /* 大星星發光效果 */
                .star-large {
                    background: ${this.config.colors.bright};
                    box-shadow:
                        0 0 calc(var(--star-size, 5px) * 3) ${this.config.colors.primary},
                        0 0 calc(var(--star-size, 5px) * 1.5) ${this.config.colors.bright},
                        0 0 calc(var(--star-size, 5px) * 0.5) rgba(255, 255, 255, 0.8);
                }

                /* 超大星星發光效果 */
                .star-xlarge {
                    background: radial-gradient(circle, ${this.config.colors.bright}, ${this.config.colors.primary});
                    box-shadow:
                        0 0 calc(var(--star-size, 8px) * 4) ${this.config.colors.primary},
                        0 0 calc(var(--star-size, 8px) * 2) ${this.config.colors.bright},
                        0 0 calc(var(--star-size, 8px) * 1) rgba(255, 255, 255, 0.9),
                        inset 0 0 calc(var(--star-size, 8px) * 0.3) rgba(255, 255, 255, 0.5);
                }

                /* 動畫類型樣式 */
                .star-bright {
                    animation: twinkle-bright 2s ease-in-out infinite;
                }

                .star-dim {
                    animation: twinkle-dim 3s ease-in-out infinite;
                }

                .star-pulse {
                    animation: twinkle-pulse 4s ease-in-out infinite;
                }

                /* 靜態星星延遲動畫 */
                .star-static {
                    animation-delay: var(--star-delay);
                }
            `;
            document.head.appendChild(style);
        }

        // 高性能分層星星創建系統
        createStars() {
            const config = this.getStarLayerConfig();

            console.log(`創建高密度星星系統：總計 ${config.total} 個星星 (靜態: ${config.static}, 動態: ${config.dynamic})`);

            // 分批創建星星以避免阻塞主線程
            this.createStarsInBatches(config);
        }

        // 分批創建星星 - 避免長時間阻塞主線程
        createStarsInBatches(config) {
            const batchSize = 50; // 每批創建50個星星
            let staticCreated = 0;
            let dynamicCreated = 0;

            const createBatch = () => {
                const fragment = document.createDocumentFragment();
                let batchCount = 0;

                // 創建靜態星星批次
                while (staticCreated < config.static && batchCount < batchSize) {
                    const star = this.createStaticStar();
                    this.stars.push(star);
                    fragment.appendChild(star);
                    staticCreated++;
                    batchCount++;
                }

                // 創建動態星星批次
                while (dynamicCreated < config.dynamic && batchCount < batchSize) {
                    const star = this.createDynamicStar();
                    this.stars.push(star);
                    fragment.appendChild(star);
                    dynamicCreated++;
                    batchCount++;
                }

                // 將批次添加到容器
                this.container.appendChild(fragment);

                // 如果還有星星需要創建，安排下一批
                if (staticCreated < config.static || dynamicCreated < config.dynamic) {
                    requestAnimationFrame(createBatch);
                } else {
                    console.log(`星星創建完成：${this.stars.length} 個星星已渲染`);
                    this.optimizeForHighDensity();
                    this.initializeDynamicTwinkling();
                }
            };

            // 開始創建第一批
            requestAnimationFrame(createBatch);
        }

        // 初始化動態區間閃爍系統
        initializeDynamicTwinkling() {
            if (!this.config.dynamicTwinkling.enabled) return;

            // 隨機分配星星到4個區間
            this.redistributeStarsToRegions();

            // 啟動動態閃爍循環
            this.startDynamicTwinklingCycle();

            console.log(`動態區間閃爍系統已啟動：4個區間，每個區間約${Math.floor(this.stars.length / 4)}個星星`);
        }

        // 隨機重新分配星星到區間
        redistributeStarsToRegions() {
            // 清空現有區間
            this.starRegions = [[], [], [], []];

            // 創建星星索引數組並隨機打亂
            const starIndices = Array.from({length: this.stars.length}, (_, i) => i);
            this.shuffleArray(starIndices);

            // 平均分配到4個區間
            const starsPerRegion = Math.floor(this.stars.length / 4);

            for (let i = 0; i < this.stars.length; i++) {
                const regionIndex = Math.min(3, Math.floor(i / starsPerRegion));
                const star = this.stars[starIndices[i]];
                this.starRegions[regionIndex].push(star);

                // 為星星添加區間標識
                star.dataset.region = regionIndex;
                star.dataset.originalOpacity = star.style.opacity || '1';
            }
        }

        // 數組隨機打亂算法 (Fisher-Yates)
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // 啟動動態閃爍循環
        startDynamicTwinklingCycle() {
            const { fadeTransition, staggerDelay } = this.config.dynamicTwinkling;

            // 初始狀態：所有星星都可見
            this.stars.forEach(star => {
                star.style.transition = `opacity ${fadeTransition}ms ease-in-out`;
                star.style.opacity = star.dataset.originalOpacity;
            });

            let currentCycleRegion = 0;

            const cycleTick = () => {
                // 當前區間開始淡出
                this.fadeRegion(currentCycleRegion, 'out');

                // 下一個區間開始淡入 (延遲一半的過渡時間)
                setTimeout(() => {
                    const nextRegion = (currentCycleRegion + 1) % 4;
                    this.fadeRegion(nextRegion, 'in');
                }, fadeTransition / 2);

                // 移動到下一個區間
                currentCycleRegion = (currentCycleRegion + 1) % 4;

                // 每個循環結束後重新隨機分配星星
                if (currentCycleRegion === 0) {
                    setTimeout(() => {
                        this.redistributeStarsToRegions();
                    }, fadeTransition);
                }
            };

            // 立即開始第一次循環
            cycleTick();

            // 設置定期循環
            this.twinklingCycleId = setInterval(cycleTick, staggerDelay);
        }

        // 區間淡入淡出控制
        fadeRegion(regionIndex, direction) {
            const region = this.starRegions[regionIndex];
            if (!region) return;

            region.forEach(star => {
                if (direction === 'out') {
                    // 淡出到20%透明度，保持微弱可見
                    const originalOpacity = parseFloat(star.dataset.originalOpacity);
                    star.style.opacity = originalOpacity * 0.2;
                } else {
                    // 淡入到原始透明度
                    star.style.opacity = star.dataset.originalOpacity;
                }
            });
        }

        // 高密度優化 - 使用Intersection Observer和虛擬化 + 4區間循環動畫
        optimizeForHighDensity() {
            if (this.stars.length < 1000) return; // 只在高密度時啟用

            // 創建Intersection Observer來管理可見性
            this.visibilityObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const star = entry.target;
                    if (entry.isIntersecting) {
                        star.style.display = '';
                        star.classList.remove('virtualized');
                    } else {
                        // 對於不可見的星星，減少渲染負擔
                        star.style.display = 'none';
                        star.classList.add('virtualized');
                    }
                });
            }, {
                rootMargin: '100px', // 提前100px開始加載
                threshold: 0
            });

            // 觀察所有星星
            this.stars.forEach(star => {
                this.visibilityObserver.observe(star);
            });

            // 啟動4區間循環動畫系統
            this.initQuadrantCycleAnimation();
        }

        // 4區間循環動畫系統
        initQuadrantCycleAnimation() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // 將星星按屏幕位置分配到4個區間
            this.quadrants = [[], [], [], []];

            this.stars.forEach(star => {
                const rect = star.getBoundingClientRect();
                const x = parseFloat(star.style.left) || rect.left;
                const y = parseFloat(star.style.top) || rect.top;

                // 確定星星屬於哪個區間 (0: 左上, 1: 右上, 2: 右下, 3: 左下)
                let quadrantIndex;
                if (x < screenWidth / 2 && y < screenHeight / 2) {
                    quadrantIndex = 0; // 左上
                } else if (x >= screenWidth / 2 && y < screenHeight / 2) {
                    quadrantIndex = 1; // 右上
                } else if (x >= screenWidth / 2 && y >= screenHeight / 2) {
                    quadrantIndex = 2; // 右下
                } else {
                    quadrantIndex = 3; // 左下
                }

                this.quadrants[quadrantIndex].push(star);

                // 為每個星星添加區間標識和初始透明度
                star.setAttribute('data-quadrant', quadrantIndex);
                star.style.transition = 'opacity 3s ease-in-out';
            });

            console.log('4區間星星分布:', this.quadrants.map(q => q.length));

            // 開始循環動畫
            this.startQuadrantCycle();
        }

        // 開始4區間循環動畫
        startQuadrantCycle() {
            let currentActiveQuadrant = 0;
            const cycleDuration = 12000; // 總循環時間12秒
            const quadrantDuration = cycleDuration / 4; // 每個區間3秒

            // 初始化：只顯示第一個區間
            this.quadrants.forEach((quadrant, index) => {
                quadrant.forEach(star => {
                    if (!star.classList.contains('virtualized')) {
                        star.style.opacity = index === 0 ? '1' : '0.1';
                    }
                });
            });

            const cycleAnimation = () => {
                const nextQuadrant = (currentActiveQuadrant + 1) % 4;
                const prevQuadrant = (currentActiveQuadrant + 3) % 4;

                // 當前區間開始淡出
                this.quadrants[currentActiveQuadrant].forEach(star => {
                    if (!star.classList.contains('virtualized')) {
                        star.style.opacity = '0.1';
                    }
                });

                // 下一個區間開始淡入
                this.quadrants[nextQuadrant].forEach(star => {
                    if (!star.classList.contains('virtualized')) {
                        star.style.opacity = '1';
                    }
                });

                currentActiveQuadrant = nextQuadrant;

                // 安排下一次切換
                setTimeout(cycleAnimation, quadrantDuration);
            };

            // 開始第一次切換
            setTimeout(cycleAnimation, quadrantDuration);

            // 保存循環控制器以便清理
            this.quadrantCycleActive = true;
        }

        // 創建靜態星星（純CSS動畫）- 更大更美觀
        createStaticStar() {
            const star = document.createElement('div');

            // 隨機位置
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            // 更大的星星尺寸 - 分層大小系統
            const sizeCategory = Math.random();
            let size, opacity, glowIntensity;

            if (sizeCategory < 0.5) {
                // 50% 小星星
                size = 2 + Math.random() * 2; // 2-4px
                opacity = 0.6 + Math.random() * 0.3;
                glowIntensity = 'small';
            } else if (sizeCategory < 0.85) {
                // 35% 中星星
                size = 3 + Math.random() * 3; // 3-6px
                opacity = 0.7 + Math.random() * 0.3;
                glowIntensity = 'medium';
            } else {
                // 15% 大星星
                size = 5 + Math.random() * 4; // 5-9px
                opacity = 0.8 + Math.random() * 0.2;
                glowIntensity = 'large';
            }

            star.className = `optimized-star star-static star-${glowIntensity}`;
            star.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                opacity: ${opacity};
                --star-delay: ${Math.random() * 3}s;
                --star-size: ${size}px;
            `;

            return star;
        }

        // 創建動態星星（JavaScript動畫）- 高性能大星星
        createDynamicStar() {
            const star = document.createElement('div');

            // 隨機位置
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            // 更大的動態星星 - 基於性能等級的智能分配
            const sizeCategory = Math.random();
            let size, animationType, glowIntensity;

            if (this.performanceLevel === 'high') {
                // 高性能設備 - 更大更炫酷的星星
                if (sizeCategory < 0.5) {
                    size = 1 + Math.random() * 6; // 1-6px
                    glowIntensity = 'medium';
                } else if (sizeCategory < 0.7) {
                    size = 6 + Math.random() * 4; // 6-10px
                    glowIntensity = 'large';
                } else {
                    size = 10 + Math.random() * 10; // 10-20px - 超大星星
                    glowIntensity = 'xlarge';
                }
            } else {
                // 中低性能設備 - 適中大小
                size = 2.5 + Math.random() * 5; // 2.5-7.5px
                glowIntensity = sizeCategory < 0.7 ? 'medium' : 'large';
            }

            // 隨機選擇動畫類型
            const animationTypes = ['bright', 'dim', 'pulse'];
            const weights = this.performanceLevel === 'high' ? [0.4, 0.3, 0.3] : [0.3, 0.5, 0.2];
            animationType = this.getWeightedRandom(animationTypes, weights);

            star.className = `optimized-star star-${animationType} star-${glowIntensity}`;

            // 使用transform而非left/top以獲得更好的性能
            star.style.cssText = `
                transform: translate(${x}px, ${y}px) translateZ(0);
                width: ${size}px;
                height: ${size}px;
                --star-size: ${size}px;
                will-change: opacity, transform;
            `;

            // 設置動畫參數
            if (animationType === 'pulse') {
                star.style.setProperty('--pulse-duration', `${2 + Math.random() * 3}s`);
            }

            return star;
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

        // 智能性能監控和自適應調整
        monitorPerformance() {
            let frameCount = 0;
            let lastTime = performance.now();
            let performanceHistory = [];
            let adjustmentCooldown = 0;

            const checkPerformance = () => {
                frameCount++;
                const currentTime = performance.now();

                if (currentTime - lastTime >= 1000) {
                    const fps = frameCount;
                    frameCount = 0;
                    lastTime = currentTime;

                    // 記錄性能歷史
                    performanceHistory.push(fps);
                    if (performanceHistory.length > 5) {
                        performanceHistory.shift();
                    }

                    // 減少調整冷卻時間
                    if (adjustmentCooldown > 0) adjustmentCooldown--;

                    // 智能性能調整（更寬松的閾值）
                    if (adjustmentCooldown === 0) {
                        const avgFPS = performanceHistory.reduce((a, b) => a + b, 0) / performanceHistory.length;

                        // 性能過低時漸進式降級
                        if (avgFPS < 25 && this.stars.length > 200) {
                            this.adaptivePerformanceAdjustment('reduce');
                            adjustmentCooldown = 3; // 3秒冷卻
                        }
                        // 性能良好時可以恢復
                        else if (avgFPS > 45 && this.canRestoreStars()) {
                            this.adaptivePerformanceAdjustment('restore');
                            adjustmentCooldown = 5; // 5秒冷卻
                        }
                    }
                }

                if (this.isRunning) {
                    requestAnimationFrame(checkPerformance);
                }
            };

            requestAnimationFrame(checkPerformance);
        }

        // 自適應性能調整 - 更智能的星星管理
        adaptivePerformanceAdjustment(action) {
            const config = this.getStarLayerConfig();

            if (action === 'reduce') {
                // 優先隱藏動態星星而不是刪除
                const dynamicStars = this.stars.filter(star =>
                    star.classList.contains('star-pulse') ||
                    star.classList.contains('star-bright')
                );

                const hideCount = Math.min(
                    Math.floor(dynamicStars.length * 0.15), // 只隱藏15%的動態星星
                    50 // 最多隱藏50個
                );

                for (let i = 0; i < hideCount; i++) {
                    if (dynamicStars[i]) {
                        dynamicStars[i].style.display = 'none';
                        dynamicStars[i].classList.add('performance-hidden');
                    }
                }

                console.log(`性能優化：隱藏了 ${hideCount} 個動態星星`);
            }
            else if (action === 'restore') {
                // 恢復被隱藏的星星
                const hiddenStars = this.stars.filter(star =>
                    star.classList.contains('performance-hidden')
                );

                const restoreCount = Math.min(hiddenStars.length, 30);

                for (let i = 0; i < restoreCount; i++) {
                    if (hiddenStars[i]) {
                        hiddenStars[i].style.display = '';
                        hiddenStars[i].classList.remove('performance-hidden');
                    }
                }

                console.log(`性能恢復：恢復了 ${restoreCount} 個星星`);
            }
        }

        // 檢查是否可以恢復星星
        canRestoreStars() {
            const hiddenStars = this.stars.filter(star =>
                star.classList.contains('performance-hidden')
            );
            return hiddenStars.length > 0;
        }

        // 移除舊的reduceStarCount方法，替換為更智能的系統

        start() {
            this.isRunning = true;
            if (this.performanceLevel !== 'low') {
                this.monitorPerformance();
            }
        }

        stop() {
            this.isRunning = false;

            // 停止動態閃爍循環
            if (this.twinklingCycleId) {
                clearInterval(this.twinklingCycleId);
                this.twinklingCycleId = null;
            }

            // 清理區間定時器
            this.regionTimers.forEach(timer => clearTimeout(timer));
            this.regionTimers = [];
        }

        destroy() {
            this.stop();

            // 清理Intersection Observer
            if (this.visibilityObserver) {
                this.visibilityObserver.disconnect();
                this.visibilityObserver = null;
            }

            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }

            // 清理注入的CSS
            const style = document.getElementById('optimized-stars-css');
            if (style) {
                style.remove();
            }

            // 清理星星數組和區間
            this.stars = [];
            this.starRegions = [[], [], [], []];
        }



        // 高性能滾動動畫系統 - 60FPS優化
        initScrollAnimations() {
            // 使用RAF節流的Intersection Observer
            let rafId = null;
            const pendingAnimations = new Set();

            const processAnimations = () => {
                pendingAnimations.forEach(entry => {
                    const element = entry.target;
                    if (entry.isIntersecting) {
                        // GPU加速的動畫
                        element.style.opacity = '1';
                        element.style.transform = 'translate3d(0, 0, 0)';
                        element.classList.add('animate-in');
                        pendingAnimations.delete(entry);
                    }
                });
                rafId = null;
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => pendingAnimations.add(entry));

                if (!rafId) {
                    rafId = requestAnimationFrame(processAnimations);
                }
            }, {
                threshold: 0.1,
                rootMargin: '50px 0px' // 提前50px開始動畫
            });

            const animateElements = document.querySelectorAll('.content-card');
            animateElements.forEach((el, index) => {
                // 初始狀態設置
                el.style.opacity = '0';
                el.style.transform = 'translate3d(0, 30px, 0)';
                el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
                el.style.willChange = 'opacity, transform';

                observer.observe(el);
            });

            // 存儲observer以便清理
            this.scrollObserver = observer;
        }

        // 超高性能卡片懸浮效果 - 防抖動優化
        initCardHoverEffects() {
            const cards = document.querySelectorAll('.content-card');
            let hoverTimeout = null;

            cards.forEach(card => {
                // 預設GPU加速屬性
                card.style.willChange = 'transform';
                card.style.backfaceVisibility = 'hidden';
                card.style.perspective = '1000px';

                // 使用防抖動的hover效果
                card.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    // 使用transform3d確保GPU加速
                    card.style.transform = 'translate3d(0, -4px, 0)';
                    card.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                });

                card.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        card.style.transform = 'translate3d(0, 0, 0)';
                    }, 50); // 50ms防抖動
                });

                // 觸摸設備優化
                if ('ontouchstart' in window) {
                    card.addEventListener('touchstart', () => {
                        card.style.transform = 'translate3d(0, -2px, 0)';
                    });

                    card.addEventListener('touchend', () => {
                        setTimeout(() => {
                            card.style.transform = 'translate3d(0, 0, 0)';
                        }, 150);
                    });
                }
            });
        }

        // 點擊動畫 - 性能优化版
        initClickAnimations() {
            // 检查用户是否偏好减少动画
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            // 使用节流限制点击动画频率
            let lastClickTime = 0;
            document.addEventListener('click', (e) => {
                const now = Date.now();
                if (now - lastClickTime > 100) { // 限制100ms内只能触发一次
                    this.createClickRipple(e.clientX, e.clientY);
                    lastClickTime = now;
                }
            });
        }

        createClickRipple(x, y) {
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            ripple.style.cssText = `
                position: fixed;
                left: ${x - 15}px;
                top: ${y - 15}px;
                width: 30px;
                height: 30px;
                border: 1px solid var(--primary-accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.6;
                transform: scale(0);
                transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                will-change: transform, opacity;
            `;
            document.body.appendChild(ripple);

            // 使用requestAnimationFrame优化动画
            requestAnimationFrame(() => {
                ripple.style.transform = 'scale(2)';
                ripple.style.opacity = '0';
            });

            setTimeout(() => ripple.remove(), 300);
        }
    }

    // ===== 高性能加載系統 =====
    class LoadingManager {
        constructor() {
            this.isLoading = true;
            this.loadingTasks = new Set();
            this.init();
        }

        init() {
            this.createLoadingOverlay();
            this.addLoadingTask('dom');
            this.addLoadingTask('fonts');
            this.addLoadingTask('images');
            this.addLoadingTask('stars');

            // DOM加載完成
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.completeTask('dom');
                });
            } else {
                this.completeTask('dom');
            }

            // 字體加載完成
            if (document.fonts) {
                document.fonts.ready.then(() => {
                    this.completeTask('fonts');
                });
            } else {
                setTimeout(() => this.completeTask('fonts'), 1000);
            }

            // 圖片加載完成
            this.checkImagesLoaded();
        }

        createLoadingOverlay() {
            const overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.innerHTML = `
                <div class="loading-background">
                    <div class="particle-system" id="particle-system"></div>
                    <div class="grid-overlay"></div>
                    <div class="holographic-elements">
                        <div class="holo-ring holo-ring-1"></div>
                        <div class="holo-ring holo-ring-2"></div>
                        <div class="holo-ring holo-ring-3"></div>
                    </div>
                </div>
                <div class="loading-content">
                    <div class="tech-logo">
                        <div class="logo-core"></div>
                        <div class="logo-rings">
                            <div class="logo-ring"></div>
                            <div class="logo-ring"></div>
                            <div class="logo-ring"></div>
                        </div>
                        <div class="logo-pulse"></div>
                    </div>
                    <div class="loading-text">
                        <span class="text-main">INITIALIZING SYSTEM</span>
                        <span class="text-sub" id="loading-status">Loading components...</span>
                    </div>
                    <div class="loading-progress-container">
                        <div class="progress-track">
                            <div class="progress-bar" id="loading-progress-bar"></div>
                            <div class="progress-glow"></div>
                        </div>
                        <div class="progress-percentage" id="progress-percentage">0%</div>
                    </div>
                    <div class="loading-details">
                        <div class="detail-item" id="detail-dom">DOM: <span>PENDING</span></div>
                        <div class="detail-item" id="detail-fonts">FONTS: <span>PENDING</span></div>
                        <div class="detail-item" id="detail-images">IMAGES: <span>PENDING</span></div>
                        <div class="detail-item" id="detail-stars">STARS: <span>PENDING</span></div>
                    </div>
                </div>
            `;

            // 添加高科技CSS樣式
            const style = document.createElement('style');
            style.textContent = `
                #loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 1;
                    transition: opacity 0.8s ease-out;
                    overflow: hidden;
                }

                .loading-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                /* 粒子系統 */
                .particle-system {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: #00ffff;
                    border-radius: 50%;
                    opacity: 0.7;
                    animation: float 6s linear infinite;
                    box-shadow: 0 0 6px #00ffff;
                }

                @keyframes float {
                    0% {
                        transform: translateY(100vh) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.7;
                    }
                    90% {
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateY(-10vh) translateX(100px);
                        opacity: 0;
                    }
                }

                /* 網格覆蓋層 */
                .grid-overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-image:
                        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                    animation: gridMove 20s linear infinite;
                    opacity: 0.3;
                }

                @keyframes gridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }

                /* 全息環形元素 */
                .holographic-elements {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .holo-ring {
                    position: absolute;
                    border: 2px solid rgba(0, 255, 255, 0.3);
                    border-radius: 50%;
                    animation: holoRotate 15s linear infinite;
                }

                .holo-ring-1 {
                    width: 300px;
                    height: 300px;
                    top: 20%;
                    left: 10%;
                    border-color: rgba(102, 126, 234, 0.4);
                    animation-duration: 20s;
                }

                .holo-ring-2 {
                    width: 200px;
                    height: 200px;
                    top: 60%;
                    right: 15%;
                    border-color: rgba(118, 75, 162, 0.4);
                    animation-duration: 25s;
                    animation-direction: reverse;
                }

                .holo-ring-3 {
                    width: 150px;
                    height: 150px;
                    bottom: 20%;
                    left: 20%;
                    border-color: rgba(240, 147, 251, 0.4);
                    animation-duration: 30s;
                }

                @keyframes holoRotate {
                    0% { transform: rotate(0deg) scale(1); opacity: 0.3; }
                    50% { transform: rotate(180deg) scale(1.1); opacity: 0.6; }
                    100% { transform: rotate(360deg) scale(1); opacity: 0.3; }
                }

                /* 主要內容區域 */
                .loading-content {
                    text-align: center;
                    color: white;
                    z-index: 10;
                    position: relative;
                }

                /* 科技Logo */
                .tech-logo {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 40px;
                }

                .logo-core {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 40px;
                    height: 40px;
                    background: radial-gradient(circle, #00ffff, #0080ff);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    box-shadow:
                        0 0 20px #00ffff,
                        0 0 40px #00ffff,
                        0 0 60px #00ffff;
                    animation: corePulse 2s ease-in-out infinite;
                }

                @keyframes corePulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.2); }
                }

                .logo-rings {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .logo-ring {
                    position: absolute;
                    border: 2px solid transparent;
                    border-top: 2px solid #00ffff;
                    border-radius: 50%;
                    animation: logoSpin 3s linear infinite;
                }

                .logo-ring:nth-child(1) {
                    width: 60px;
                    height: 60px;
                    top: 30px;
                    left: 30px;
                    animation-duration: 2s;
                }

                .logo-ring:nth-child(2) {
                    width: 80px;
                    height: 80px;
                    top: 20px;
                    left: 20px;
                    border-top-color: #667eea;
                    animation-duration: 3s;
                    animation-direction: reverse;
                }

                .logo-ring:nth-child(3) {
                    width: 100px;
                    height: 100px;
                    top: 10px;
                    left: 10px;
                    border-top-color: #764ba2;
                    animation-duration: 4s;
                }

                @keyframes logoSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .logo-pulse {
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    border: 2px solid rgba(0, 255, 255, 0.3);
                    border-radius: 50%;
                    animation: logoPulse 2s ease-in-out infinite;
                }

                @keyframes logoPulse {
                    0% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.3); opacity: 0.1; }
                    100% { transform: scale(1.6); opacity: 0; }
                }

                /* 載入文字 */
                .loading-text {
                    margin-bottom: 30px;
                }

                .text-main {
                    display: block;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #00ffff;
                    text-shadow: 0 0 10px #00ffff;
                    margin-bottom: 10px;
                    letter-spacing: 2px;
                    animation: textGlow 2s ease-in-out infinite alternate;
                }

                .text-sub {
                    display: block;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-weight: 300;
                }

                @keyframes textGlow {
                    0% { text-shadow: 0 0 10px #00ffff; }
                    100% { text-shadow: 0 0 20px #00ffff, 0 0 30px #00ffff; }
                }

                /* 進度條容器 */
                .loading-progress-container {
                    margin-bottom: 30px;
                    position: relative;
                }

                .progress-track {
                    width: 300px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    margin: 0 auto 10px;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid rgba(0, 255, 255, 0.3);
                }

                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #00ffff, #667eea, #764ba2);
                    border-radius: 3px;
                    width: 0%;
                    transition: width 0.5s ease;
                    position: relative;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                }

                .progress-glow {
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(90deg, transparent, #00ffff, transparent);
                    border-radius: 5px;
                    opacity: 0;
                    animation: progressGlow 2s ease-in-out infinite;
                }

                @keyframes progressGlow {
                    0%, 100% { opacity: 0; transform: translateX(-100%); }
                    50% { opacity: 0.8; transform: translateX(100%); }
                }

                .progress-percentage {
                    font-size: 1.1rem;
                    color: #00ffff;
                    font-weight: 600;
                    text-shadow: 0 0 5px #00ffff;
                }

                /* 載入詳情 */
                .loading-details {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .detail-item {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.6);
                    padding: 5px 10px;
                    border: 1px solid rgba(0, 255, 255, 0.2);
                    border-radius: 15px;
                    background: rgba(0, 255, 255, 0.05);
                    transition: all 0.3s ease;
                }

                .detail-item span {
                    color: #ff6b6b;
                    font-weight: 600;
                }

                .detail-item.completed span {
                    color: #00ffff;
                    text-shadow: 0 0 5px #00ffff;
                }

                .detail-item.completed {
                    border-color: #00ffff;
                    background: rgba(0, 255, 255, 0.1);
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
                }

                /* 響應式設計 */
                @media (max-width: 768px) {
                    .tech-logo {
                        width: 80px;
                        height: 80px;
                    }

                    .logo-core {
                        width: 30px;
                        height: 30px;
                    }

                    .logo-ring:nth-child(1) {
                        width: 40px;
                        height: 40px;
                        top: 20px;
                        left: 20px;
                    }

                    .logo-ring:nth-child(2) {
                        width: 60px;
                        height: 60px;
                        top: 10px;
                        left: 10px;
                    }

                    .logo-ring:nth-child(3) {
                        width: 80px;
                        height: 80px;
                        top: 0;
                        left: 0;
                    }

                    .progress-track {
                        width: 250px;
                    }

                    .text-main {
                        font-size: 1.2rem;
                    }

                    .loading-details {
                        gap: 10px;
                    }

                    .holo-ring-1, .holo-ring-2, .holo-ring-3 {
                        display: none;
                    }
                }
            `;

            document.head.appendChild(style);
            document.body.appendChild(overlay);
            this.overlay = overlay;

            // 創建粒子系統
            this.createParticleSystem();
        }

        createParticleSystem() {
            const particleContainer = document.getElementById('particle-system');
            if (!particleContainer) return;

            // 創建50個粒子
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 6 + 's';
                    particle.style.animationDuration = (4 + Math.random() * 4) + 's';

                    // 隨機顏色
                    const colors = ['#00ffff', '#667eea', '#764ba2', '#f093fb'];
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.boxShadow = `0 0 6px ${particle.style.background}`;

                    particleContainer.appendChild(particle);

                    // 粒子生命週期管理
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.remove();
                        }
                    }, 8000);
                }, i * 100);
            }

            // 持續創建新粒子
            this.particleInterval = setInterval(() => {
                if (this.isLoading && particleContainer.children.length < 50) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = '0s';
                    particle.style.animationDuration = (4 + Math.random() * 4) + 's';

                    const colors = ['#00ffff', '#667eea', '#764ba2', '#f093fb'];
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.boxShadow = `0 0 6px ${particle.style.background}`;

                    particleContainer.appendChild(particle);

                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.remove();
                        }
                    }, 8000);
                }
            }, 200);
        }

        addLoadingTask(taskName) {
            this.loadingTasks.add(taskName);
            this.updateProgress();
        }

        completeTask(taskName) {
            this.loadingTasks.delete(taskName);
            this.updateProgress();
            this.updateTaskStatus(taskName);

            if (this.loadingTasks.size === 0) {
                this.finishLoading();
            }
        }

        updateTaskStatus(taskName) {
            const statusElement = document.getElementById(`detail-${taskName}`);
            if (statusElement) {
                statusElement.classList.add('completed');
                statusElement.querySelector('span').textContent = 'COMPLETE';
            }

            // 更新載入狀態文字
            const statusText = document.getElementById('loading-status');
            if (statusText) {
                const statusMessages = {
                    'dom': 'DOM structure loaded...',
                    'fonts': 'Fonts initialized...',
                    'images': 'Images processed...',
                    'stars': 'Star system activated...'
                };
                statusText.textContent = statusMessages[taskName] || 'Processing...';
            }
        }

        updateProgress() {
            const totalTasks = 4; // dom, fonts, images, stars
            const completedTasks = totalTasks - this.loadingTasks.size;
            const progress = (completedTasks / totalTasks) * 100;

            const progressBar = document.getElementById('loading-progress-bar');
            const progressPercentage = document.getElementById('progress-percentage');

            if (progressBar) {
                progressBar.style.width = progress + '%';
            }

            if (progressPercentage) {
                progressPercentage.textContent = Math.round(progress) + '%';
            }
        }

        checkImagesLoaded() {
            const images = document.querySelectorAll('img');
            let loadedCount = 0;
            const totalImages = images.length;

            if (totalImages === 0) {
                this.completeTask('images');
                return;
            }

            images.forEach(img => {
                if (img.complete) {
                    loadedCount++;
                } else {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            this.completeTask('images');
                        }
                    });

                    img.addEventListener('error', () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            this.completeTask('images');
                        }
                    });
                }
            });

            if (loadedCount === totalImages) {
                this.completeTask('images');
            }
        }

        finishLoading() {
            // 更新最終狀態
            const statusText = document.getElementById('loading-status');
            if (statusText) {
                statusText.textContent = 'System ready. Launching...';
            }

            // 清理粒子系統
            if (this.particleInterval) {
                clearInterval(this.particleInterval);
            }

            setTimeout(() => {
                // 添加完成動畫效果
                this.overlay.style.transform = 'scale(1.1)';
                this.overlay.style.opacity = '0';

                setTimeout(() => {
                    this.overlay.remove();
                    this.isLoading = false;

                    // 觸發加載完成事件
                    window.dispatchEvent(new CustomEvent('loadingComplete'));
                }, 800);
            }, 500);
        }
    }

    // 創建加載管理器
    const loadingManager = new LoadingManager();

    // 創建高密度優化星星閃爍背景系統實例
    window.starsBackground = new OptimizedTwinklingStarsSystem({
        starCount: window.innerWidth < 768 ? 1500 : 4000 // 大幅增加星星密度 - 配合高性能優化系統
    });

    // 星星系統加載完成
    setTimeout(() => {
        loadingManager.completeTask('stars');
    }, 1000);

    // ===== 初始化 =====
    initTheme();
    initScrollProgress();
    checkMenuScrollNeed();
    updateScrollProgress();
    updateLastModified();

    // 頁面加載完成後的最終檢查 - 防抖優化
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            checkMenuScrollNeed();
            updateScrollProgress();
            updateLastModified();
        }, 150);
    });

    window.addEventListener('load', () => {
        checkMenuScrollNeed();
        updateScrollProgress();
        updateLastModified();
    });
});