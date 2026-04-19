function initSharedComponents() {
    initAllQuizzes();
    
    if (typeof ProgressTracker !== 'undefined') {
        console.log('ProgressTracker initialized');
    }
    
    if (typeof NotificationSystem !== 'undefined') {
        console.log('NotificationSystem initialized');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedComponents);
} else {
    initSharedComponents();
}

window.initSharedComponents = initSharedComponents;
