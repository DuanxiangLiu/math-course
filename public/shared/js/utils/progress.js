const ProgressTracker = {
    STORAGE_KEY: 'math_course_progress',
    
    getAll() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    },
    
    save(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },
    
    markComplete(chapterId, sectionId = null) {
        const progress = this.getAll();
        
        if (!progress[chapterId]) {
            progress[chapterId] = {
                completed: false,
                sections: {},
                completedAt: null
            };
        }
        
        if (sectionId) {
            progress[chapterId].sections[sectionId] = {
                completed: true,
                completedAt: new Date().toISOString()
            };
        }
        
        this.save(progress);
    },
    
    getStatus(chapterId, sectionId = null) {
        const progress = this.getAll();
        
        if (!progress[chapterId]) {
            return { completed: false };
        }
        
        if (sectionId) {
            return progress[chapterId].sections[sectionId] || { completed: false };
        }
        
        return progress[chapterId];
    },
    
    getChapterProgress(chapterId, totalSections) {
        const progress = this.getAll();
        
        if (!progress[chapterId]) {
            return 0;
        }
        
        const completedSections = Object.keys(progress[chapterId].sections || {}).length;
        return Math.round((completedSections / totalSections) * 100);
    },
    
    reset(chapterId = null) {
        if (chapterId) {
            const progress = this.getAll();
            delete progress[chapterId];
            this.save(progress);
        } else {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    },
    
    isChapterComplete(chapterId, totalSections) {
        return this.getChapterProgress(chapterId, totalSections) === 100;
    }
};

window.ProgressTracker = ProgressTracker;
