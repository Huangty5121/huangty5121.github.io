/**
 * Google Analytics Configuration
 * 谷歌分析配置
 */

// Initialize Google Analytics
(function() {
    // Create and append Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-V3NDD3YDYH';
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    
    // Configure Google Analytics
    script.onload = function() {
        gtag('js', new Date());
        gtag('config', 'G-V3NDD3YDYH', {
            // Enhanced privacy settings
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
    };

    // Make gtag globally available
    window.gtag = gtag;
})();
