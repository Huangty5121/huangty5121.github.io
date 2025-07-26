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

        // 增強卡片懸浮效果 - 性能优化版
        initCardHoverEffects() {
            const cards = document.querySelectorAll('.content-card');
            cards.forEach(card => {
                // 预设will-change以优化GPU加速
                card.style.willChange = 'transform';

                card.addEventListener('mouseenter', () => {
                    // 简化变换，减少重绘
                    card.style.transform = 'translateY(-4px)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
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

    // 創建高密度優化星星閃爍背景系統實例
    window.starsBackground = new OptimizedTwinklingStarsSystem({
        starCount: window.innerWidth < 768 ? 1500 : 4000 // 大幅增加星星密度 - 配合高性能優化系統
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