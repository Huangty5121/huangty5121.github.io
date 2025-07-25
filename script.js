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

        // 簡單鼠標跟隨效果（僅桌面端）
        initCursorEffects() {
            // 檢測是否為觸摸設備
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // 只在非觸摸設備上啟用鼠標跟隨
            if (!isTouchDevice) {
                // 創建單一跟隨圓點 - 簡化為純色半透明
                this.cursorDot = document.createElement('div');
                this.cursorDot.className = 'cursor-dot';
                this.cursorDot.style.cssText = `
                    position: fixed;
                    width: 16px;
                    height: 16px;
                    background: rgba(173, 144, 213, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    transition: opacity 0.3s ease;
                    opacity: 0;
                `;
                document.body.appendChild(this.cursorDot);

                document.addEventListener('mousemove', (e) => {
                    this.cursorDot.style.left = e.clientX + 'px';
                    this.cursorDot.style.top = e.clientY + 'px';
                    this.cursorDot.style.opacity = '1';
                });

                document.addEventListener('mouseleave', () => {
                    this.cursorDot.style.opacity = '0';
                });
            }
        }

        // 移除舊的軌跡方法，現在使用簡單的單點跟隨

        // 中國水墨流動背景效果
        initInkWashBackground() {
            // 性能檢測：在低性能設備上禁用動畫
            const isLowPerformance = window.innerWidth < 768 ||
                                   navigator.hardwareConcurrency < 4 ||
                                   /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isLowPerformance && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return; // 跳過動畫初始化
            }

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
                opacity: 1;
                mix-blend-mode: multiply;
            `;
            document.body.appendChild(this.inkWashCanvas);

            this.inkWashCtx = this.inkWashCanvas.getContext('2d');
            // 啟用硬件加速
            this.inkWashCtx.imageSmoothingEnabled = false;
            this.resizeInkCanvas();
            this.createInkElements();
            this.animateInkWash();

            // 節流調整大小事件以提升性能
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.resizeInkCanvas();
                    this.createInkElements(); // 重新創建粒子以適應新尺寸
                }, 150);
            });
        }

        resizeInkCanvas() {
            this.inkWashCanvas.width = window.innerWidth;
            this.inkWashCanvas.height = window.innerHeight;
        }

        createInkElements() {
            this.inkParticles = [];

            // 根據設備性能調整粒子數量
            const isLowPerformance = window.innerWidth < 768 || navigator.hardwareConcurrency < 4;
            const inkCount = isLowPerformance ? 8 : 12; // 減少粒子數量
            const flowCount = isLowPerformance ? 3 : 4;

            // 創建水墨流動粒子（生物元素）
            for (let i = 0; i < inkCount; i++) {
                // 根據主題選擇顏色
                const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
                let particleColor;
                if (isDarkTheme) {
                    // 暗色主題：使用更亮的顏色
                    particleColor = Math.random() > 0.5 ? [240, 235, 245] : [180, 200, 220]; // 更亮的紫灰和藍灰
                } else {
                    // 亮色主題：使用原有顏色
                    particleColor = Math.random() > 0.5 ? [213, 203, 225] : [52, 75, 94];
                }

                this.inkParticles.push({
                    type: 'ink',
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 100 + 50, // 減小粒子大小
                    speedX: (Math.random() - 0.5) * 0.4, // 減慢速度
                    speedY: (Math.random() - 0.5) * 0.4,
                    opacity: Math.random() * 0.7 + 0.3, // 降低透明度
                    color: particleColor,
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.015 + 0.008, // 減慢脈衝速度
                    flowDirection: Math.random() * Math.PI * 2,
                    flowSpeed: Math.random() * 0.003 + 0.001
                });
            }

            // 創建流動線條
            for (let i = 0; i < flowCount; i++) {
                // 根據主題選擇顏色
                const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
                let flowColor;
                if (isDarkTheme) {
                    // 暗色主題：使用更亮的顏色
                    flowColor = Math.random() > 0.5 ? [240, 235, 245] : [180, 200, 220]; // 更亮的紫灰和藍灰
                } else {
                    // 亮色主題：使用原有顏色
                    flowColor = Math.random() > 0.5 ? [213, 203, 225] : [52, 75, 94];
                }

                this.inkParticles.push({
                    type: 'flow',
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    length: Math.random() * 200 + 120, // 減小線條長度
                    width: Math.random() * 2 + 1,
                    angle: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.008 + 0.003, // 減慢速度
                    opacity: Math.random() * 0.5 + 0.3, // 降低透明度
                    color: flowColor,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        animateInkWash() {
            // 性能優化：限制幀率到30fps以提升性能
            if (!this.lastFrameTime) this.lastFrameTime = 0;
            const now = performance.now();
            const deltaTime = now - this.lastFrameTime;

            if (deltaTime < 33.33) { // 限制到30fps
                requestAnimationFrame(() => this.animateInkWash());
                return;
            }
            this.lastFrameTime = now;

            // 清除畫布
            this.inkWashCtx.clearRect(0, 0, this.inkWashCanvas.width, this.inkWashCanvas.height);

            // 創建動態背景漸變，根據主題調整（減少計算頻率）
            const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
            const time = now * 0.0005; // 減慢時間變化

            // 緩存漸變計算和主題變化檢測
            if (!this.cachedGradient || this.lastTheme !== isDarkTheme || now - this.lastGradientUpdate > 100) {
                // 如果主題改變，重新創建粒子以應用新顏色
                if (this.lastTheme !== undefined && this.lastTheme !== isDarkTheme) {
                    this.createInkElements();
                }

                this.cachedGradient = this.inkWashCtx.createLinearGradient(0, 0, this.inkWashCanvas.width, this.inkWashCanvas.height);
                if (isDarkTheme) {
                    // 暗色主題：使用更亮、更鮮明的顏色，增強對比度
                    this.cachedGradient.addColorStop(0, `rgba(240, 235, 245, ${0.15 + Math.sin(time * 0.5) * 0.04})`);
                    this.cachedGradient.addColorStop(0.5, `rgba(220, 210, 235, ${0.22 + Math.cos(time * 0.3) * 0.06})`);
                    this.cachedGradient.addColorStop(1, `rgba(180, 200, 220, ${0.12 + Math.sin(time * 0.7) * 0.03})`);
                } else {
                    // 亮色主題：使用較暗的顏色
                    this.cachedGradient.addColorStop(0, `rgba(52, 75, 94, ${0.12 + Math.sin(time * 0.5) * 0.03})`);
                    this.cachedGradient.addColorStop(0.5, `rgba(213, 203, 225, ${0.18 + Math.cos(time * 0.3) * 0.05})`);
                    this.cachedGradient.addColorStop(1, `rgba(52, 75, 94, ${0.10 + Math.sin(time * 0.7) * 0.02})`);
                }
                this.lastTheme = isDarkTheme;
                this.lastGradientUpdate = now;
            }

            this.inkWashCtx.fillStyle = this.cachedGradient;
            this.inkWashCtx.fillRect(0, 0, this.inkWashCanvas.width, this.inkWashCanvas.height);

            this.inkParticles.forEach(particle => {
                if (particle.type === 'ink') {
                    // 水墨粒子流動
                    particle.flowDirection += particle.flowSpeed;
                    particle.x += Math.cos(particle.flowDirection) * particle.speedX;
                    particle.y += Math.sin(particle.flowDirection) * particle.speedY;
                    particle.pulsePhase += particle.pulseSpeed;

                    // 邊界檢查和循環
                    if (particle.x < -particle.size) particle.x = this.inkWashCanvas.width + particle.size;
                    if (particle.x > this.inkWashCanvas.width + particle.size) particle.x = -particle.size;
                    if (particle.y < -particle.size) particle.y = this.inkWashCanvas.height + particle.size;
                    if (particle.y > this.inkWashCanvas.height + particle.size) particle.y = -particle.size;

                    const pulseOpacity = particle.opacity * (0.6 + 0.4 * Math.sin(particle.pulsePhase));

                    // 創建水墨擴散效果
                    const inkGradient = this.inkWashCtx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size
                    );

                    const [r, g, b] = particle.color;
                    inkGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${pulseOpacity})`);
                    inkGradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${pulseOpacity * 0.6})`);
                    inkGradient.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, ${pulseOpacity * 0.2})`);
                    inkGradient.addColorStop(1, 'transparent');

                    this.inkWashCtx.fillStyle = inkGradient;
                    this.inkWashCtx.beginPath();
                    this.inkWashCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.inkWashCtx.fill();

                } else if (particle.type === 'flow') {
                    // 流動線條
                    particle.phase += particle.speed;
                    particle.x += Math.cos(particle.angle) * 0.5;
                    particle.y += Math.sin(particle.angle) * 0.5;

                    // 邊界檢查
                    if (particle.x < -particle.length) particle.x = this.inkWashCanvas.width + particle.length;
                    if (particle.x > this.inkWashCanvas.width + particle.length) particle.x = -particle.length;
                    if (particle.y < -particle.length) particle.y = this.inkWashCanvas.height + particle.length;
                    if (particle.y > this.inkWashCanvas.height + particle.length) particle.y = -particle.length;

                    const flowOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.phase));
                    const [r, g, b] = particle.color;

                    // 繪製流動線條
                    this.inkWashCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${flowOpacity})`;
                    this.inkWashCtx.lineWidth = particle.width;
                    this.inkWashCtx.lineCap = 'round';

                    this.inkWashCtx.beginPath();
                    const startX = particle.x;
                    const startY = particle.y;
                    const endX = particle.x + Math.cos(particle.angle) * particle.length;
                    const endY = particle.y + Math.sin(particle.angle) * particle.length;

                    // 創建波浪效果（減少段數以提升性能）
                    const segments = 10; // 從20減少到10
                    for (let i = 0; i <= segments; i++) {
                        const t = i / segments;
                        const x = startX + (endX - startX) * t;
                        const y = startY + (endY - startY) * t + Math.sin(particle.phase + t * Math.PI * 3) * 8; // 減少波浪幅度

                        if (i === 0) {
                            this.inkWashCtx.moveTo(x, y);
                        } else {
                            this.inkWashCtx.lineTo(x, y);
                        }
                    }
                    this.inkWashCtx.stroke();
                }
            });

            requestAnimationFrame(() => this.animateInkWash());
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
                        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.25)';
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

    // 創建增強動畫系統實例
    window.enhancedAnimations = new EnhancedAnimationSystem();

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